import * as functions from 'firebase-functions';
import { MailgunOptions } from './types';

export const isProduction = (): boolean =>
  functions.firebaseConfig()?.projectId !== 'reslife-staging';

const mailgunAPI = functions.config().mailgun.key;
export const mailgun = require('mailgun-js')({
  apiKey: mailgunAPI,
  domain: functions.config().mailgun.domain,
});

function getNumReciepients(field: string | undefined): number {
  if (!field) {
    return 0;
  } else {
    return field.split(',').length;
  }
}

export const sendEmail = (
  emailOptions: MailgunOptions,
  test = false
): Promise<void> => {
  if (test) {
    const message = emailOptions.text;
    emailOptions.text =
      'This is a test email sent to you only. Once you uncheck test mode the following message will be sent out with the following information:\n';

    emailOptions.text += `Receipients in the "To" Field: ${emailOptions.to}\n`;
    const cc = getNumReciepients(emailOptions.cc);
    const bcc = getNumReciepients(emailOptions.bcc);
    if (cc > 0) {
      emailOptions.text += `Receipients in the "CC" Field: ${cc}\n`;
    }
    if (bcc > 0) {
      emailOptions.text += `Receipients in the "BCC" Field: ${bcc}\n\n`;
    }
    emailOptions.text +=
      'Your message is displayed below exactly as it will be for your recipients:\n\n';
    emailOptions.text += message;
    delete emailOptions.bcc;
    delete emailOptions.cc;
    emailOptions.from = functions.config().test.email;
    emailOptions.to = functions.config().test.email;
    emailOptions.subject = 'Test: ' + emailOptions.subject;
    return mailgun.messages().send(emailOptions);
  } else {
    return mailgun.messages().send(emailOptions);
  }
};
