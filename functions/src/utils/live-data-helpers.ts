import * as fbadmin from 'firebase-admin';

import {
  Boarder,
  DormDocument,
  ScheduleDayException,
  ScheduleItem,
} from '../types';
import { getAcademicYear, getDateString } from './date';

export const getActiveBoarders = async () => {
  const boarderSnap = await fbadmin
    .firestore()
    .collection('boarders')
    .where('isActive', '==', true)
    .get();
  return boarderSnap.docs.map((b) => b.data() as Boarder);
};

export const getBoardersByDate = async (date: string) => {
  const boarderSnap = await fbadmin
    .firestore()
    .collection('boarders')
    .where('startDate', '>=', date)
    .get();
  return boarderSnap.docs
    .map((b) => b.data() as Boarder)
    .filter((b) => b.endDate >= date);
};

export const isBreak = async () => {
  const date = getDateString();
  const academicYearSnap = await fbadmin
    .firestore()
    .collection('academicYears')
    .where('end', '>=', date)
    .get();
  // no year set up that ends after the current date, so it's a break
  if (academicYearSnap.empty) {
    return true;
  }
  const [currentYearSnap] = academicYearSnap.docs.filter(
    (d) => d.get('start') <= date
  );
  // there is a date, but this date is before it starts so it's a break
  if (typeof currentYearSnap === 'undefined') {
    return true;
  }

  // filter by breaks that end after the current date
  const breakSnap = await fbadmin
    .firestore()
    .collection(`academicYears/${currentYearSnap.id}/breaks`)
    .where('end', '>=', date)
    .get();

  // filter results by break that starts before this date
  const filteredBreaks = breakSnap.docs.filter((b) => b.get('start') <= date);

  return filteredBreaks.length !== 0;
};

export const getActiveDorms = async () => {
  const dormSnap = await fbadmin
    .firestore()
    .collection('dorms')
    .where('isActive', '==', true)
    .get();
  return dormSnap.docs.map((d) => d.data() as DormDocument);
};

export const getRegularSchedule = async (
  academicYear = getAcademicYear()
): Promise<ScheduleItem[]> => {
  const scheduleSnap = await fbadmin
    .firestore()
    .collection('regular-schedule')
    .where('academicYear', '==', academicYear)
    .get();
  return scheduleSnap.docs.map((d) => d.data() as ScheduleItem);
};

export const getScheduleExceptions = async (
  start: string,
  end: string
): Promise<ScheduleDayException[]> => {
  const exceptionsSnap = await fbadmin
    .firestore()
    .collection('schedule-exceptions')
    .where('date', '>=', start)
    .where('date', '<=', end)
    .get();
    return exceptionsSnap.docs.map(d => d.data() as ScheduleDayException);
};
