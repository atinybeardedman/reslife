import { TimeExcusalDoc } from '../types';
import * as fbadmin from 'firebase-admin';
import { orderByProp } from './general';
export const getExcusalsByDate = async (
  date: string
): Promise<TimeExcusalDoc[]> => {
  const excusals = await fbadmin
    .firestore()
    .collection('time-excusals')
    .where('includedDays', 'array-contains', date)
    .get();
  const docs = excusals.docs.sort(
    orderByProp<FirebaseFirestore.DocumentSnapshot>('createTime')
  );
  return docs.map((d) => d.data() as TimeExcusalDoc);
};

export const getCheckinsByDateRange = async (start: string, end: string) => {
  return fbadmin
    .firestore()
    .collection('check-ins')
    .where('date', '>=', start)
    .where('date', '<=', end)
    .get();
};
