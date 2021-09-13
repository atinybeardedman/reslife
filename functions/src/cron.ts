import * as functions from 'firebase-functions';
import * as fbadmin from 'firebase-admin';
import * as moment from 'moment-timezone';
import { toIsoTimezoneString } from './utils/date';
import { OneTimeTask, PromiseDict, RepeatedTask } from './types';
import { isBreak } from './utils/live-data-helpers';
import { sendEmail } from './utils/email';
import { isProduction } from './utils/general';

function getNextOneTime(task: OneTimeTask): Promise<OneTimeTask | null> {
  const currentTrigger = task.triggerTime;
  return fbadmin
    .firestore()
    .doc(`repeated-tasks/${task.repeatID}`)
    .get()
    .then((snap) => {
      const repeat = snap.data() as RepeatedTask;
      let nextDate = moment.tz(currentTrigger, 'America/New_York');
      const uid = fbadmin.firestore().collection('tasks').doc().id;
      switch (repeat.repeatFrequency) {
        case 'dormdays': 
          if (nextDate.day() === 4){
            nextDate = nextDate.add(3, 'day');
          } else {
            nextDate = nextDate.add(1, 'day');
          }
          break;
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
          uid,
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

      if(snap.empty){
        return;
      }
    const batch = fbadmin.firestore().batch();
    const isCurrentlyBreak = await isBreak();
    for (const doc of snap.docs) {
      const task = doc.data() as OneTimeTask;
      if (typeof taskDict[task.functionName] === 'undefined') {
        console.log(`Task: ${task.functionName} could not be found`);
        continue;
      }
      if (task.options?.alwaysRun || !isCurrentlyBreak) {
        try {
          await taskDict[task.functionName](task.options);
          batch.update(doc.ref, {status: 'complete'});
        } catch (err) {
          await sendEmail({
            to: functions.config().emails['error-receiver'],
            from: 'Error Reporter <noreply@oakwoodfriends.org>',
            subject: 'CRON Error',
            text: `${task.functionName} failed with error: ${err}`
          }, !isProduction());
          console.log(`${task.functionName} failed with error`);
          console.log(err);
          batch.update(doc.ref, {status: 'error'})
        }
      } else {
        console.log(`${task.functionName} did not run as it is currently break.`);
        batch.update(doc.ref,{ status: 'complete' });
      }

      if (task.isRepeat) {
        const nextTask = await getNextOneTime(task);
        if (nextTask) {
          batch.set(fbadmin
            .firestore()
            .collection('tasks')
            .doc(nextTask.uid), nextTask)
        }
      }
    }
    try {
      await batch.commit(); 
    } catch(err){
      console.log(err)
    }
  });
