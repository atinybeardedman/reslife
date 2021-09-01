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

export interface RepeatedTask {
  ID: string;
  repeatFrequency: "daily" | "weekdays" | "weekly" | "monthly";
  functionName: string;
  active: boolean;
  startDate: string;
  endDate: string;
  options: any;
}

export interface OneTimeTask {
  ID: string;
  status: "scheduled" | "complete" | "error";
  functionName: string;
  triggerTime: string;
  isRepeat: boolean;
  repeatID?: string;
  options: any;
}


export interface PromiseDict {
  [key: string]: (options?: any) => Promise<void>;
}
