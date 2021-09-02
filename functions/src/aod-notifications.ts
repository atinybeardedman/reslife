import * as fbadmin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { CheckInDocument, MailgunOptions, OneTimeTask } from './types';
import {
  addTime,
  combineDateTimeStr,
  getDateString,
  getTimeString,
} from './utils/date';
import { sendEmail } from './utils/email';
import { isProduction } from './utils/general';

export const scheduleCheckInReminders = async () => {
  const today = getDateString();
  const checkInSnap = await fbadmin
    .firestore()
    .collection('check-ins')
    .where('date', '==', today)
    .get();
  if (checkInSnap.empty) {
    return;
  }
  const checkIns = checkInSnap.docs.map((d) => d.data() as CheckInDocument);
  const batch = fbadmin.firestore().batch();
  for (const checkIn of checkIns) {
    const docRef = fbadmin.firestore().collection('tasks').doc();
    const task: OneTimeTask = {
      ID: docRef.id,
      functionName: 'postCheckInReminder',
      status: 'scheduled',
      isRepeat: false,
      triggerTime: combineDateTimeStr(today, addTime(checkIn.end, '10')),
    };
    batch.set(docRef, task);
  }
  try {
    await batch.commit();
  } catch (err) {
    console.log(err);
  }
};

export const postCheckInReminder = async () => {
  const today = getDateString();
  const currentTime = getTimeString();
  const lastCheckInSnap = await fbadmin
    .firestore()
    .collection('check-ins')
    .where('date', '==', today)
    .where('end', '<=', currentTime)
    .orderBy('end')
    .limitToLast(1)
    .get();
  const [lastCheckIn] = lastCheckInSnap.docs;
  if(typeof lastCheckIn !== 'undefined'){
      const expectedSnap = await lastCheckIn.ref.collection('expected').orderBy('name').get();
      if(!expectedSnap.empty){
          const studentList = expectedSnap.docs.map(d => d.get('name'));
          let text = 'The following students have not yet been checked in. Please be sure to account for them.\n';
          text += studentList.join('\n');
          const mailOptions: MailgunOptions = {
              to: functions.config().emails['aod-receiver'],
              from: functions.config().emails['aod-sender'],
              subject: `Students Missing from ${lastCheckIn.get('name')} Check-In`,
              text
          };
          try {
              await sendEmail(mailOptions, !isProduction())
          } catch(err){
              console.log(err);
          }
      }
  }
};


