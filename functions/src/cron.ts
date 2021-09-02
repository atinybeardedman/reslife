import * as functions from 'firebase-functions';
import * as fbadmin from 'firebase-admin';
import * as moment from 'moment-timezone';
import { toIsoTimezoneString } from './utils/date';
import { OneTimeTask, PromiseDict, RepeatedTask } from './types';
import { isBreak } from './utils/live-data-helpers';

function getNextOneTime(task: OneTimeTask): Promise<OneTimeTask | null> {
  const currentTrigger = task.triggerTime;
  return fbadmin
    .firestore()
    .doc(`repeatedTasks/${task.repeatID}`)
    .get()
    .then((snap) => {
      const repeat = snap.data() as RepeatedTask;
      let nextDate = moment.tz(currentTrigger, 'America/New_York');
      const ID = fbadmin.firestore().collection('tasks').doc().id;
      switch (repeat.repeatFrequency) {
        case 'weekdays':
          if (nextDate.day() === 5) {
            nextDate = nextDate.add(3, 'day');
            break;
          }
        case 'daily':
          nextDate = nextDate.add(1, 'day');
          break;
        case 'weekly':
          nextDate = nextDate.add(1, 'week');
          break;
        case 'monthly':
          nextDate = nextDate.add(1, 'month');
          break;
      }
      if (moment(repeat.endDate) >= nextDate) {
        return {
          ...task,
          ID,
          triggerTime: nextDate.format(),
        };
      } else {
        return snap.ref.update({ active: false }).then(() => null);
      }
    });
}

export const cronTriggerBuilder = (taskDict: PromiseDict) =>
  functions.pubsub.schedule('every 15 minutes').onRun(async () => {
    // this will run every 15 minutes
    const date = toIsoTimezoneString();
    const snap = await fbadmin
      .firestore()
      .collection('tasks')
      .where('status', '==', 'scheduled')
      .where('triggerTime', '<=', date)
      .get();

    const isCurrentlyBreak = await isBreak();
    for (const doc of snap.docs) {
      const task = doc.data() as OneTimeTask;
      if (typeof taskDict[task.functionName] === 'undefined') {
        console.log(`Task: ${task.functionName} could not be found`);
        continue;
      }
      if (task?.options?.alwaysRun || !isCurrentlyBreak) {
        try {
          await taskDict[task.functionName](task.options);
          await doc.ref.update({ status: 'complete' });
        } catch (err) {
          console.log(`${task.functionName} failed with error`);
          console.log(err);
          await doc.ref.update({ status: 'error' });
        }
      } else {
        console.log(`${task.functionName} did not run as it is currently break.`);
        await doc.ref.update({ status: 'complete' });
      }

      if (task.isRepeat) {
        const nextTask = await getNextOneTime(task);
        if (nextTask) {
          return fbadmin
            .firestore()
            .collection('tasks')
            .doc(nextTask.ID)
            .set(nextTask);
        }
      }
    }
    return;
  });
