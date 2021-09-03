import * as fbadmin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment-timezone';
import {
  AcademicYear,
  CheckInDocument,
  CheckInItem,
  ExcusedRecord,
  NamedTimeSpan,
  ScheduleDayException,
  ScheduleItem,
  TimeExcusalDoc,
} from './types';
import {
  addToDatestring,
  combineDateTimeStr,
  getDateFromDateString,
  getDateString,
  getIncludedDays,
} from './utils/date';
import { getCheckinsByDateRange, getExcusalsByDate } from './utils/excusals';
import {
  getBoardersByDate,
  getRegularSchedule,
  getScheduleExceptions,
} from './utils/live-data-helpers';

const removeCheckIns = async (
  startDate: string,
  endDate: string
): Promise<void> => {
  const checkInSnap = await fbadmin
    .firestore()
    .collection('check-ins')
    .where('date', '>=', startDate)
    .where('date', '<=', endDate)
    .get();
  if (checkInSnap.empty) {
    return;
  }
  const batch = fbadmin.firestore().batch();
  for (const doc of checkInSnap.docs) {
    batch.delete(doc.ref);
  }
  try {
    await batch.commit();
  } catch (err) {
    console.log(err);
  }
};

const addCheckIns = async (
  startDate: string,
  endDate: string,
  regularSchedule: ScheduleItem[],
  exceptions: ScheduleDayException[]
): Promise<void> => {
  let currentDate = moment.tz(startDate, 'America/New_York');
  let currentDatestring = getDateString(currentDate.toDate());
  const batch = fbadmin.firestore().batch();
  while (currentDatestring <= endDate) {
    const exception = exceptions.find((d) => d.date === currentDatestring);
    let checkIns: CheckInDocument[];
    if (typeof exception !== 'undefined') {
      checkIns = exception.checkIns.map((c) => ({
        'check-in': c['check-in'],
        start: c.startTime,
        end: c.endTime,
        date: currentDatestring,
      }));
    } else {
      checkIns = regularSchedule
        .filter((s) => s.days.includes(currentDate.day()))
        .map((c) => ({
          'check-in': c.name,
          start: c.startTime,
          end: c.endTime,
          date: currentDatestring,
        }));
    }
    for (const checkIn of checkIns) {
      batch.set(
        fbadmin
          .firestore()
          .doc(`check-ins/${checkIn.date}+${checkIn['check-in']}`),
        checkIn
      );
    }

    currentDate = currentDate.add(1, 'day');
    currentDatestring = getDateString(currentDate.toDate());
  }
  try {
    await batch.commit();
  } catch (err) {
    console.log(err);
  }
};

const onCheckInMetaDelete = functions.firestore
  .document('check-ins/{metaId}')
  .onDelete(async (snap) => {
    const collections = await snap.ref.listCollections();
    for (const collection of collections) {
      const batch = fbadmin.firestore().batch();
      const docs = await collection.listDocuments();
      if (docs.length > 0) {
        for (const doc of docs) {
          batch.delete(doc);
        }
        try {
          await batch.commit();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });

const onCheckInMetaCreate = functions.firestore
  .document('check-ins/{metaID}')
  .onCreate(async (snap) => {
    const doc = snap.data() as CheckInDocument;
    const checkInEnd = combineDateTimeStr(doc.date, doc.end);
    const boarders = await getBoardersByDate(doc.date);
    const excusals = await getExcusalsByDate(doc.date);
    const batch = fbadmin.firestore().batch();
    for (const boarder of boarders) {
      const excusal = excusals.find((e) => (e.boarder.uid === boarder.uid));
      if (typeof excusal !== 'undefined') {
        if (
          excusal.leaveDate < checkInEnd &&
          excusal.returnDate >= checkInEnd
        ) {
          const excusedRef = snap.ref.collection('expected').doc(boarder.uid);
          const excusedDoc: ExcusedRecord = {
            uid: boarder.uid,
            name: boarder.name,
            note: excusal.reason,
          };
          batch.set(excusedRef, excusedDoc);
          continue;
        }
      }
      const expectedRef = snap.ref.collection('expected').doc(boarder.uid);
      const expectedDoc: CheckInItem = {
        uid: boarder.uid,
        name: boarder.name,
      };
      batch.set(expectedRef, expectedDoc);
    }
    try {
      await batch.commit();
    } catch (err) {
      console.log(err);
    }
  });

const onScheduleDayExceptionCreate = functions.firestore
  .document('schedule-exceptions/{exceptionId}')
  .onCreate(async (snap) => {
    const date = snap.get('date');
    await removeCheckIns(date, date);
    const regularSchedule = await getRegularSchedule();
    await addCheckIns(date, date, regularSchedule, [
      snap.data() as ScheduleDayException,
    ]);
  });
const onScheduleDayExceptionUpdate = functions.firestore
  .document('schedule-exceptions/{exceptionId}')
  .onUpdate(async (snap) => {
    const date = snap.after.get('date');
    await removeCheckIns(date, date);
    const regularSchedule = await getRegularSchedule();
    await addCheckIns(date, date, regularSchedule, [
      snap.after.data() as ScheduleDayException,
    ]);
  });
const onScheduleDayExceptionDelete = functions.firestore
  .document('schedule-exceptions/{exceptionId}')
  .onDelete(async (snap) => {
    const date = snap.get('date');
    await removeCheckIns(date, date);
    const regularSchedule = await getRegularSchedule();
    await addCheckIns(date, date, regularSchedule, []);
  });

const onBreakCreate = functions.firestore
  .document('academic-years/{yearId}/breaks/{breakId}')
  .onCreate(async (snap) => {
    const breakDoc = snap.data() as NamedTimeSpan;
    await removeCheckIns(breakDoc.start, breakDoc.end);
  });

const onBreakUpdate = functions.firestore
  .document('academic-years/{yearId}/breaks/{breakId}')
  .onUpdate(async (snap, context) => {
    const beforeDoc = snap.before.data() as NamedTimeSpan;
    const afterDoc = snap.after.data() as NamedTimeSpan;
    if (beforeDoc.start === afterDoc.start && beforeDoc.end === afterDoc.end) {
      // no change to timing, ignore
      return;
    }
    const regularSchedule = await getRegularSchedule(context.params.yearId);
    // check if start changed
    if (beforeDoc.start < afterDoc.start) {
      // new start is later, so add back in
      // don't include new start
      const exclusiveStart = addToDatestring(afterDoc.start, -1);
      const scheduleExceptions = await getScheduleExceptions(
        beforeDoc.start,
        exclusiveStart
      );
      await addCheckIns(
        beforeDoc.start,
        exclusiveStart,
        regularSchedule,
        scheduleExceptions
      );
    } else if (beforeDoc.start > afterDoc.start) {
      // new start is earlier, so remove check-ins
      await removeCheckIns(afterDoc.start, beforeDoc.start);
    }
    // check if end changed
    if (beforeDoc.end < afterDoc.end) {
      // new end is later, so remove check-ins
      await removeCheckIns(beforeDoc.end, afterDoc.end);
    } else if (beforeDoc.end > afterDoc.end) {
      // new end is earlier, so add back in
      const exclusiveStart = addToDatestring(afterDoc.end, 1);
      const scheduleExceptions = await getScheduleExceptions(
        exclusiveStart,
        beforeDoc.end
      );
      await addCheckIns(
        exclusiveStart,
        beforeDoc.end,
        regularSchedule,
        scheduleExceptions
      );
    }
  });

const onBreakDelete = functions.firestore
  .document('academic-years/{yearId}/breaks/{breakId}')
  .onDelete(async (snap, context) => {
    const breakDoc = snap.data() as NamedTimeSpan;
    const regularSchedule = await getRegularSchedule(context.params.yearId);
    const scheduleExceptions = await getScheduleExceptions(
      breakDoc.start,
      breakDoc.end
    );
    await addCheckIns(
      breakDoc.start,
      breakDoc.end,
      regularSchedule,
      scheduleExceptions
    );
  });

const onAcademicYearUpdate = functions.firestore
  .document('academic-years/{yearId}')
  .onUpdate(async (snap, context) => {
    const beforeDoc = snap.before.data() as AcademicYear;
    const afterDoc = snap.after.data() as AcademicYear;
    if (beforeDoc.start > afterDoc.start) {
      // year starts earlier, add more check-ins
      const scheduleExceptions = await getScheduleExceptions(
        beforeDoc.start,
        afterDoc.start
      );
      const regularSchedule = await getRegularSchedule(context.params.yearId);
      await addCheckIns(
        beforeDoc.start,
        afterDoc.start,
        regularSchedule,
        scheduleExceptions
      );
    } else if (beforeDoc.start < afterDoc.start) {
      // year starts later, delete check-ins
      await removeCheckIns(beforeDoc.start, afterDoc.start);
    }

    if (beforeDoc.end < afterDoc.end) {
      // year ends later, add more check ins
      const scheduleExceptions = await getScheduleExceptions(
        beforeDoc.end,
        afterDoc.end
      );
      const regularSchedule = await getRegularSchedule(context.params.yearId);
      await addCheckIns(
        beforeDoc.end,
        afterDoc.end,
        regularSchedule,
        scheduleExceptions
      );
    } else if (beforeDoc.end > afterDoc.end) {
      // year ends earlier, remove check ins
      await removeCheckIns(afterDoc.end, beforeDoc.end);
    }
  });

const getBreakList = async (academicYear: string): Promise<string[]> => {
  const breaks = await fbadmin
    .firestore()
    .collection(`academic-years/${academicYear}/breaks`)
    .get()
    .then((snap) => snap.docs.map((d) => d.data() as NamedTimeSpan));

  let breakList: string[] = [];
  for (const breakDoc of breaks) {
    const included = getIncludedDays(breakDoc.start, breakDoc.end);
    breakList = [...breakList, ...included];
  }
  return breakList;
};

const getAffectedDatelist = async (
  scheduleItem: ScheduleItem
): Promise<string[]> => {
  const year = await fbadmin
    .firestore()
    .doc(`academic-years/${scheduleItem.academicYear}`)
    .get()
    .then((snap) => snap.data() as AcademicYear);
  const scheduleExceptions = (
    await getScheduleExceptions(year.start, year.end)
  ).map((e) => e.date);

  const breakList = await getBreakList(scheduleItem.academicYear);
  const filter = (date: string): boolean => {
    if (!scheduleItem.days.includes(getDateFromDateString(date).getDay())) {
      return false;
    }
    if (breakList.includes(date)) {
      return false;
    }
    if (scheduleExceptions.includes(date)) {
      return false;
    }
    return true;
  };
  return getIncludedDays(year.start, year.end, filter);
};

const onRegularCheckInCreate = functions.firestore
  .document('regular-schedule/{itemId}')
  .onCreate(async (snap) => {
    const scheduleItem = snap.data() as ScheduleItem;
    const includedDays = await getAffectedDatelist(scheduleItem);
    const batch = fbadmin.firestore().batch();
    for (const date of includedDays) {
      const docRef = fbadmin
        .firestore()
        .doc(`check-ins/${date}+${scheduleItem.name}`);
      const checkInDoc: CheckInDocument = {
        'check-in': scheduleItem.name,
        start: scheduleItem.startTime,
        end: scheduleItem.endTime,
        date,
      };
      batch.set(docRef, checkInDoc);
    }
    try {
      await batch.commit();
    } catch (err) {
      console.log(err);
    }
  });

const onRegularCheckInUpdate = functions.firestore
  .document('regular-schedule/{itemId}')
  .onUpdate(async (snap) => {
    const oldItem = snap.before.data() as ScheduleItem;
    const newItem = snap.after.data() as ScheduleItem;
    const nameChange = oldItem.name !== newItem.name;
    const includedDays = await getAffectedDatelist(newItem);
    const batch = fbadmin.firestore().batch();
    for (const date of includedDays) {
      if (nameChange) {
        batch.delete(
          fbadmin.firestore().doc(`check-ins/${date}+${oldItem.name}`)
        );
      }
      const docRef = fbadmin
        .firestore()
        .doc(`check-ins/${date}+${newItem.name}`);
      const checkInDoc: CheckInDocument = {
        'check-in': newItem.name,
        start: newItem.startTime,
        end: newItem.endTime,
        date,
      };
      batch.set(docRef, checkInDoc);
    }
    try {
      await batch.commit();
    } catch (err) {
      console.log(err);
    }
  });

const onRegularCheckInDelete = functions.firestore
  .document('regular-schedule/{itemId}')
  .onDelete(async (snap) => {
    const oldItem = snap.data() as ScheduleItem;
    const includedDays = await getAffectedDatelist(oldItem);
    const batch = fbadmin.firestore().batch();
    for (const date of includedDays) {
      batch.delete(
        fbadmin.firestore().doc(`check-ins/${date}+${oldItem.name}`)
      );
    }
    try {
      await batch.commit();
    } catch (err) {
      console.log(err);
    }
  });

const onTimeExcusalCreate = functions.firestore.document('time-excusals/{excusalId}').onCreate(async (snap) => {
    const excusalDoc = snap.data() as TimeExcusalDoc;
    const checkIns = await getCheckinsByDateRange(excusalDoc.includedDays[0], excusalDoc.includedDays[excusalDoc.includedDays.length - 1]);
    if(checkIns.empty){
        return
    }
    const batch = fbadmin.firestore().batch();
    for(const checkIn of checkIns.docs){
        const checkInDoc = checkIn.data() as CheckInDocument;
        const endTime = combineDateTimeStr(checkInDoc.date, checkInDoc.end);
        if(excusalDoc.leaveDate < endTime && excusalDoc.returnDate >= endTime){
            batch.delete(checkIn.ref.collection('excused').doc(excusalDoc.boarder.uid));
            batch.delete(checkIn.ref.collection('checked').doc(excusalDoc.boarder.uid));
           
                const excusalRecord: ExcusedRecord = {
                    ...excusalDoc.boarder,
                    note: excusalDoc.reason
                }
                batch.set(checkIn.ref.collection('excused').doc(excusalDoc.boarder.uid), excusalRecord);
                batch.delete(checkIn.ref.collection('expected').doc(excusalDoc.boarder.uid));
            
        }
    }
    try {
        await batch.commit();
    } catch(err){
        console.log(err);
    }
});

const onTimeExcusalDelete = functions.firestore.document('time-excusals/{excusalId}').onDelete(async (snap) => {
    const excusalDoc = snap.data() as TimeExcusalDoc;
    const checkIns = await getCheckinsByDateRange(excusalDoc.includedDays[0], excusalDoc.includedDays[excusalDoc.includedDays.length - 1]);
    if(checkIns.empty){
        return
    }
    const batch = fbadmin.firestore().batch();
    for(const checkIn of checkIns.docs){
        const checkInDoc = checkIn.data() as CheckInDocument;
        const endTime = combineDateTimeStr(checkInDoc.date, checkInDoc.end);
        if(excusalDoc.leaveDate < endTime && excusalDoc.returnDate >= endTime){
            batch.delete(checkIn.ref.collection('excused').doc(excusalDoc.boarder.uid));
            batch.delete(checkIn.ref.collection('checked').doc(excusalDoc.boarder.uid));
                batch.set(checkIn.ref.collection('expected').doc(excusalDoc.boarder.uid), {...excusalDoc.boarder});
        }
    }
    try {
        await batch.commit();
    } catch(err){
        console.log(err);
    }
});

export const backgroundFns = {
  onCheckInMetaCreate,
  onCheckInMetaDelete,
  onScheduleDayExceptionCreate,
  onScheduleDayExceptionUpdate,
  onScheduleDayExceptionDelete,
  onBreakCreate,
  onBreakUpdate,
  onBreakDelete,
  onAcademicYearUpdate,
  onRegularCheckInCreate,
  onRegularCheckInUpdate,
  onRegularCheckInDelete,
  onTimeExcusalCreate,
  onTimeExcusalDelete
};
