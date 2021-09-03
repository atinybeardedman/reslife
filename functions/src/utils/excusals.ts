import { TimeExcusalDoc } from '../types';
import * as fbadmin from 'firebase-admin';

export const getExcusalsByDate = async (date: string): Promise<TimeExcusalDoc[]> => {
    const excusals = await fbadmin.firestore().collection('time-excusals').where('includedDays', 'array-contains', date).get();
    return excusals.docs.map(d => d.data() as TimeExcusalDoc);
}