import * as functions from 'firebase-functions';
import * as fbadmin from 'firebase-admin';
import * as moment from 'moment-timezone';
import { toIsoTimezoneString } from './utils/date';
import { OneTimeTask, PromiseDict, RepeatedTask } from './types';


function getNextOneTime(task: OneTimeTask): Promise<OneTimeTask | null>{
    const currentTrigger = task.triggerTime;
    return fbadmin.firestore().doc(`repeatedTasks/${task.repeatID}`).get().then(
        snap => {
            const repeat = snap.data() as RepeatedTask;
            let nextDate = moment.tz(currentTrigger, 'America/New_York');
            const ID = fbadmin.firestore().collection('tasks').doc().id;
            switch(repeat.repeatFrequency){
                case 'weekdays':
                    if(nextDate.day() === 5){
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
            if(moment(repeat.endDate) >= nextDate){
                return {
                   ...task,
                   ID,
                   triggerTime: nextDate.format()
                }
            } else {
                return snap.ref.update({active: false}).then(() => null);
            }
            
        }
    )

}

export const cronTriggerBuilder = (taskDict: PromiseDict) => functions.pubsub
.schedule('every 15 minutes')
.onRun((context) => {
  // this will run every 15 minutes
  const date = toIsoTimezoneString();
  console.log('Cron triggered');
  return fbadmin
    .firestore()
    .collection('tasks')
    .where('status', '==', 'scheduled')
    .where('triggerTime', '<=', date)
    .get()
    .then((snap) => {
      const promises = [];
      for (const doc of snap.docs) {
        const task = doc.data() as OneTimeTask;
        if(typeof taskDict[task.functionName] === 'undefined'){
          console.log(`Task: ${task.functionName} could not be found`);
          return;
        }
        const promise = taskDict[task.functionName](task.options)
          .then(() => {
            if (task.isRepeat) {
              return getNextOneTime(task).then((nextTask) => {
                if (nextTask) {
                  return fbadmin
                    .firestore()
                    .collection('tasks')
                    .doc(nextTask.ID)
                    .set(nextTask);
                }
                return;
              });
            }
            return;
          })
          .then(() => doc.ref.update({ status: 'complete' }))
          .catch((err) => {
            console.log(err);
            return doc.ref.update({ status: 'error' });
          });
        promises.push(promise);
      }
      return Promise.all(promises);
    });
});