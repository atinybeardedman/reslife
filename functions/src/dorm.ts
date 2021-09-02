import * as functions from 'firebase-functions';
import * as fbadmin from 'firebase-admin';
import {
  MailgunOptions,
  RoomInspectionStudentDoc,
  RoomInspectionMetaDoc,
  DormNoteMetaDoc,
  DormNoteField,
} from './types';
import { getDateString } from './utils/date';
import { sendEmail } from './utils/email';
import { isProduction } from './utils/general';
import { getActiveBoarders, getActiveDorms } from './utils/live-data-helpers';

import * as moment from 'moment-timezone';

const emailOnInspectionFail = functions.firestore
  .document('/roomInspections/{metaDoc}/students/{inspectionDoc}')
  .onUpdate(async (snap, _context) => {
    const beforeDoc = snap.before.data() as RoomInspectionStudentDoc;
    const afterDoc = snap.after.data() as RoomInspectionStudentDoc;
    if (afterDoc.result === 'failed' && beforeDoc.result !== 'failed') {
      let text =
        'The dorm parent on duty has marked that you have just failed room inspection. ';
      if (afterDoc.note) {
        text += 'They gave the following reason for failure: ';
        text += '\n';
        text += afterDoc.note;
        text += '\n';
      } else {
        text +=
          'If you are uncertain as to why they marked this failure, please ask them. ';
      }
      text +=
        'Once you have cleaned up, check in with the dorm parent and they will check again to ensure that you have passed.';
      const emailOptions: MailgunOptions = {
        from: functions.config().emails['inspection-sender'],
        to: afterDoc.email,
        subject: 'Room Inspection Failure',
        text,
      };
      try {
        await sendEmail(emailOptions, !isProduction());
      } catch (err) {
        console.log(err);
      }
    }
    return;
  });

const generateRoomInspectionDocs = async () => {
  const currentBoarders = await getActiveBoarders();
  const dorms = await getActiveDorms();
  const date = getDateString();
  const batch = fbadmin.firestore().batch();
  for (const dorm of dorms) {
    const docRef = fbadmin
      .firestore()
      .collection('roomInspections')
      .doc(`${date}+${dorm.name}`);
    const doc: RoomInspectionMetaDoc = {
      dorm: dorm.name,
      date,
      uid: docRef.id,
    };
    batch.set(docRef, doc);
    for (const boarder of currentBoarders) {
      if (boarder.dorm === dorm.name) {
        const inspectionDocRef = docRef.collection('students').doc(boarder.uid);
        const inspectionDoc: RoomInspectionStudentDoc = {
          name: boarder.name,
          uid: boarder.uid,
          email: boarder.email,
          result: 'pending',
        };
        batch.set(inspectionDocRef, inspectionDoc);
      }
    }
  }
  try {
    await batch.commit();
  } catch (err) {
    console.log(err);
  }
};

const generateDormNotes = async () => {
  const dorms = await getActiveDorms();
  const date = getDateString();
  const dormFieldsSnap = await fbadmin.firestore().doc('configuration/dorm-notes').get();
  const dormFields = dormFieldsSnap.get('fields');
  const batch = fbadmin.firestore().batch();
  for (const dorm of dorms){
    const docRef = fbadmin.firestore().doc(`/dorm-notes/${date}+${dorm.name}`);
    const metaDoc: DormNoteMetaDoc = {
      dorm: dorm.name,
      date
    }
    batch.set(docRef, metaDoc);
    for(const [index, field] of dormFields.entries()){
      const noteRef = docRef.collection('notes').doc();
      const noteDoc: DormNoteField = {
        uid: noteRef.id,
        fieldName: field,
        order: index,
        isLocked: false,
        note: ''
      };
      batch.set(noteRef, noteDoc);
    }
  }
  try {
    await batch.commit();
  } catch(err){
    console.log(err);
  }
}

const lockOldNotes = async () => {
  const today = moment.tz(new Date(), 'America/New_York');
  const oldDate = today.subtract(1, 'days');
  const date = getDateString(oldDate.toDate());
  const metaSnap = await fbadmin.firestore().collection('dorm-notes').where('date', '<', date).get();
  if(metaSnap.empty){
    return
  }
  const batch = fbadmin.firestore().batch();
  for(const doc of metaSnap.docs){
    const notesSnap = await doc.ref.collection('notes').where('isLocked','==', false).get();
    for(const noteDoc of notesSnap.docs){
      batch.update(noteDoc.ref, {isLocked: true});
    }
  }
  try {
    await batch.commit();
  } catch(err){
    console.log(err);
  }

}

export const backgroundFns = {
  emailOnInspectionFail,
};

export const triggerableFns = {
  generateRoomInspectionDocs,
  generateDormNotes,
  lockOldNotes
};
