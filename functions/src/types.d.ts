export interface MaintenanceRequest {
  subject: string;
  building: string;
  room?: string;
  request: string;
  date: string;
}

export interface MaintenanceRequestDoc extends MaintenanceRequest {
  requestor: {
    name: string;
    email: string;
    uid: string;
  };
  uid: string;
}

export interface MailgunOptions {
  to: string;
  from: string;
  cc?: string;
  bcc?: string;
  subject: string;
  text: string;
  html?: string;
}
