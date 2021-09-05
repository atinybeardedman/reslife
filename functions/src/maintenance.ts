import * as functions from 'firebase-functions';
import { MailgunOptions, MaintenanceRequestDoc } from './types';
import { sendEmail } from './utils/email';
import { isProduction } from './utils/general';

export const onNewMaintenanceRequest = functions.firestore
  .document('maintenanceRequests/{requestID}')
  .onCreate((snap, _context) => {
    const doc = snap.data() as MaintenanceRequestDoc;
    const body = [
      `Request Date: ${doc.date}`,
      `Requestor: ${doc.requestor.name}`,
      `Building: ${doc.building}`,
    ];
    if (doc.room) {
      body.push(`Room: ${doc.room}`);
    }
    body.push(`Requested By: ${doc.requestor.name}`);
    body.push(`Request Details: \n\n${doc.request}`);

    const emailOptions: MailgunOptions = {
      to: functions.config().emails['maintenance-receiver'],
      from: functions.config().emails['maintenance-sender'],
      cc: doc.requestor.email,
      subject: doc.request,
      text: body.join('\n'),
    };
    try {
        return sendEmail(emailOptions, !isProduction());
    } catch (err){
        console.log(err);
        return;
    }
  });

