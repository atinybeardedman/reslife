import * as fbadmin from 'firebase-admin';
import { OneTimeTask, RepeatedTask, RepeatedTaskMeta } from '../types';


export const createRepeatedTask = async (task: RepeatedTaskMeta): Promise<void> => {
    const repeatedRef = fbadmin.firestore().collection('repeated-tasks').doc();
    const repeatedTask: RepeatedTask = {
        ...task,
        active: true,
        uid: repeatedRef.id
    };
    const batch = fbadmin.firestore().batch();
    batch.set(repeatedRef, repeatedTask);

    const oneTimeRef = fbadmin.firestore().collection('tasks').doc();
    const oneTime: OneTimeTask = {
        functionName: task.functionName,
        options: task.options,
        triggerTime: task.startDate,
        status: 'scheduled',
        isRepeat: true,
        repeatID: repeatedRef.id,
        uid: oneTimeRef.id
    };
    batch.set(oneTimeRef, oneTime);

    try {
        await batch.commit();
    } catch(err){
        console.log(err);
    }
}