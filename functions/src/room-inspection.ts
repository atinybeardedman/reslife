import * as functions from 'firebase-functions';
import * as fbadmin from 'firebase-admin';
import {
  MailgunOptions,
  RoomInspectionStudentDoc,
  RoomInspectionMetaDoc,
} from './types';
import { getDateString } from './utils/date';
import { sendEmail } from './utils/email';
import { isProduction } from './utils/general';
import { getActiveBoarders, getActiveDorms } from './utils/live-data-helpers';

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

export const backgroundFns = {
  emailOnInspectionFail,
};

export const triggerableFns = {
  generateRoomInspectionDocs,
};
