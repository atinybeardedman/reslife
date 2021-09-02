import * as fbadmin from 'firebase-admin';

import { Boarder, DormDocument } from '../types';
import { getDateString } from './date';

export const getActiveBoarders = async () => {
  const boarderSnap = await fbadmin
    .firestore()
    .collection('boarders')
    .where('isActive', '==', true)
    .get();
  return boarderSnap.docs.map((b) => b.data() as Boarder);
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
    .collection(`academicYears/${currentYearSnap.id}/breaks`).where('end', '>=', date)
    .get();

  // filter results by break that starts before this date
  const filteredBreaks = breakSnap.docs.filter(b => b.get('start') <= date);
  
  return filteredBreaks.length !== 0;
  
};

export const getActiveDorms = async () => {
  const dormSnap = await fbadmin
  .firestore()
  .collection('dorms')
  .where('isActive', '==', true)
  .get();
return dormSnap.docs.map((d) => d.data() as DormDocument);
}
