import * as fbadmin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { Boarder, CheckInItem, CheckInRecord, ExcusedRecord } from './types';
import {
  addToDatestring,
  getDateFromDateString,
  getDateString,
} from './utils/date';
import { getCheckinsByDateRange } from './utils/excusals';

const toggleBoarderStatus = async () => {
  const today = getDateString();
  const inActiveBoarders = await fbadmin
    .firestore()
    .collection('boarders')
    .where('startDate', '<=', today)
    .where('isActive', '==', false)
    .get()
    .then((snap) => snap.docs);

  const activeBoarders = await fbadmin
    .firestore()
    .collection('boarders')
    .where('endDate', '<=', today)
    .where('isActive', '==', true)
    .get()
    .then((snap) => snap.docs);

  if (inActiveBoarders.length > 0 || activeBoarders.length > 0) {
    const batch = fbadmin.firestore().batch();

    for (const b of inActiveBoarders) {
      batch.update(b.ref, { isActive: true });
    }

    for (const b of activeBoarders) {
      batch.update(b.ref, { isActive: false });
    }
    try {
      await batch.commit();
    } catch (err) {
      console.log(err);
    }
  }
};

const is7DayOnly = (
  checkIn: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
): boolean => {
  const day = getDateFromDateString(checkIn.get('date')).getDay();
  return day >= 5 || (day === 0 && checkIn.get('end') <= '19:00');
};

const getCheckInRefWithItem = (
  checkIn: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>,
  boarder: Boarder
): {
  ref: FirebaseFirestore.DocumentReference;
  item: CheckInRecord | ExcusedRecord;
} => {
  let item: CheckInItem | ExcusedRecord;
  let ref: FirebaseFirestore.DocumentReference;
  const shouldExcuse5Day = is7DayOnly(checkIn);
  if (boarder.type === '5 Day' && shouldExcuse5Day) {
    ref = checkIn.ref.collection('excused').doc(boarder.uid);
    item = {
      name: boarder.name,
      uid: boarder.uid,
      note: '5 day',
    };
  } else {
    ref = checkIn.ref.collection('expected').doc(boarder.uid);
    item = {
      name: boarder.name,
      uid: boarder.uid,
    };
  }
  return {
    item,
    ref,
  };
};

const onBoarderCreate = functions.firestore
  .document('boarders/{boarderID}')
  .onCreate(async (snap) => {
    const boarder = snap.data() as Boarder;
    const checkIns = await getCheckinsByDateRange(
      boarder.startDate,
      boarder.endDate
    );
    let batchIndex = 0;
    let operationCount = 0;
    const batchList = [];
    batchList.push(fbadmin.firestore().batch());
    for (const checkIn of checkIns.docs) {
      const { ref, item } = getCheckInRefWithItem(checkIn, boarder);
      batchList[batchIndex].set(ref, item);
      if (operationCount === 499) {
        batchList.push(fbadmin.firestore().batch());
        batchIndex++;
        operationCount = 0;
      }
    }
    try {
      await Promise.all(batchList.map((b) => b.commit()));
      await fbadmin.auth().createUser({
        email: boarder.email,
        displayName: boarder.name,
        uid: boarder.uid,
      });
    } catch (err) {
      console.log(err);
    }
  });

const onBoarderDelete = functions.firestore
  .document('boarders/{boarderID}')
  .onDelete(async (snap) => {
    const boarder = snap.data() as Boarder;
    const checkIns = await getCheckinsByDateRange(
      boarder.startDate,
      boarder.endDate
    );
    let batchIndex = 0;
    let operationCount = 0;
    const batchList = [];
    batchList.push(fbadmin.firestore().batch());
    for (const checkIn of checkIns.docs) {
      batchList[batchIndex].delete(
        checkIn.ref.collection('expected').doc(boarder.uid)
      );
      batchList[batchIndex].delete(
        checkIn.ref.collection('excused').doc(boarder.uid)
      );
      operationCount += 2;
      if (operationCount >= 498) {
        batchList.push(fbadmin.firestore().batch());
        batchIndex++;
        operationCount = 0;
      }
    }
    try {
      await Promise.all(batchList.map((b) => b.commit()));
      await fbadmin.auth().deleteUser(boarder.uid);
    } catch (err) {
      console.log(err);
    }
  });

const onBoarderUpdate = functions.firestore
  .document('boarders/{boarderId}')
  .onUpdate(async (snap) => {
    const before = snap.before.data() as Boarder;
    const after = snap.after.data() as Boarder;
    const datesChanged =
      before.startDate !== after.startDate || before.endDate !== after.endDate;
    if (datesChanged) {
      if (before.startDate !== after.startDate) {
        if (before.startDate < after.startDate) {
          // starting earlier than before, add to check-ins (inclusive)
          const checkIns = await getCheckinsByDateRange(
            before.startDate,
            after.startDate
          );
          let batchIndex = 0;
          let operationCount = 0;
          const batchList = [];
          batchList.push(fbadmin.firestore().batch());
          for (const checkIn of checkIns.docs) {
            const { ref, item } = getCheckInRefWithItem(checkIn, after);
            batchList[batchIndex].set(ref, item);
            operationCount++;
            if (operationCount === 499) {
              batchList.push(fbadmin.firestore().batch());
              batchIndex++;
              operationCount = 0;
            }
          }
          try {
            await Promise.all(batchList.map((b) => b.commit()));
          } catch (err) {
            console.log(err);
          }
        } else {
          // starting later than expected, remove check-ins (exclusive ending)
          const end = addToDatestring(after.startDate, -1);
          const checkIns = await getCheckinsByDateRange(before.startDate, end);
          let batchIndex = 0;
          let operationCount = 0;
          const batchList = [];
          batchList.push(fbadmin.firestore().batch());
          for (const checkIn of checkIns.docs) {
            const { ref, item } = getCheckInRefWithItem(checkIn, after);
            batchList[batchIndex].set(ref, item);
            operationCount++;
            if (operationCount === 499) {
              batchList.push(fbadmin.firestore().batch());
              batchIndex++;
              operationCount = 0;
            }
          }
          try {
            await Promise.all(batchList.map((b) => b.commit()));
          } catch (err) {
            console.log(err);
          }
        }
      }

      if (before.endDate !== after.endDate) {
        if (before.endDate < after.endDate) {
          // ending later than before, add more check-ins (inclusive)
          const checkIns = await getCheckinsByDateRange(
            before.endDate,
            after.endDate
          );
          const batch = fbadmin.firestore().batch();
          for (const checkIn of checkIns.docs) {
            const { ref, item } = getCheckInRefWithItem(checkIn, after);
            batch.set(ref, item);
          }
          try {
            await batch.commit();
          } catch (err) {
            console.log(err);
          }
        } else {
          // ending earlier than before, remove check-ins (exclusive starting)
          const start = addToDatestring(after.endDate, 1);
          const checkIns = await getCheckinsByDateRange(start, after.endDate);
          const batch = fbadmin.firestore().batch();
          for (const checkIn of checkIns.docs) {
            const { ref, item } = getCheckInRefWithItem(checkIn, after);
            batch.set(ref, item);
          }
          try {
            await batch.commit();
          } catch (err) {
            console.log(err);
          }
        }
      }
    } else {
      // start and end dates haven't changed so need to affect all relevant check-ins
      if (before.type !== after.type) {
        // should adjust check-ins. But only from current date forward
        const today = getDateString();
        if (before.type === '5 Day') {
          // now 7 day, needs to shift from excused to expected for all weekends
          const checkIns = await getCheckinsByDateRange(today, after.endDate);
          const batch = fbadmin.firestore().batch();
          for (const checkIn of checkIns.docs.filter((d) => is7DayOnly(d))) {
            const expectedRef = checkIn.ref
              .collection('expected')
              .doc(after.uid);
            const expectedDoc: CheckInItem = {
              uid: after.uid,
              name: after.name,
            };
            batch.set(expectedRef, expectedDoc);
            const excusedRef = checkIn.ref.collection('excused').doc(after.uid);
            batch.delete(excusedRef);
          }
          try {
            await batch.commit();
          } catch (err) {
            console.log(err);
          }
        } else {
          // now 5 day, needs to shifdt from expected to excused for all weekends
          const checkIns = await getCheckinsByDateRange(today, after.endDate);
          const batch = fbadmin.firestore().batch();
          for (const checkIn of checkIns.docs.filter((d) => is7DayOnly(d))) {
            const expectedRef = checkIn.ref
              .collection('expected')
              .doc(after.uid);

            batch.delete(expectedRef);

            const excusedRef = checkIn.ref.collection('excused').doc(after.uid);
            const excusalDoc: ExcusedRecord = {
              uid: after.uid,
              name: after.name,
              note: '5 day',
            };
            batch.set(excusedRef, excusalDoc);
          }
          try {
            await batch.commit();
          } catch (err) {
            console.log(err);
          }
        }
      }

      if (before.name !== after.name) {
        const expectedSnap = await fbadmin
          .firestore()
          .collectionGroup('expected')
          .where('uid', '==', after.uid)
          .get();
        const checkedSnap = await fbadmin
          .firestore()
          .collectionGroup('checked')
          .where('uid', '==', after.uid)
          .get();
        const excusedSnap = await fbadmin
          .firestore()
          .collectionGroup('excused')
          .where('uid', '==', after.uid)
          .get();
        try {
          await updateAllDocs(expectedSnap, { name: after.name });
          await updateAllDocs(checkedSnap, { name: after.name });
          await updateAllDocs(excusedSnap, { name: after.name });
        } catch (err) {
          console.log(err);
        }
      }
    }
  });

const updateAllDocs = async (
  snap: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
  update: Partial<Boarder>
): Promise<void> => {
  const batch = fbadmin.firestore().batch();
  for (const expectedDoc of snap.docs) {
    batch.update(expectedDoc.ref, update);
  }
  try {
    await batch.commit();
  } catch (err) {
    console.log(err);
  }
};

export const triggerableFns = {
  toggleBoarderStatus,
};

export const backgroundFns = {
  onBoarderCreate,
  onBoarderDelete,
  onBoarderUpdate,
};
