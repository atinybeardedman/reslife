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
  repeatFrequency: 'daily' | 'weekdays' | 'weekly' | 'monthly';
  functionName: string;
  active: boolean;
  startDate: string;
  endDate: string;
  options: any;
}

export interface OneTimeTask {
  ID: string;
  status: 'scheduled' | 'complete' | 'error';
  functionName: string;
  triggerTime: string;
  isRepeat: boolean;
  repeatID?: string;
  options: any;
}


export interface PromiseDict {
  [key: string]: (options?: any) => Promise<void>;
}


export type BoarderType = '5 Day' | '7 Day';

export interface BoarderPermissions {
  canWalk: boolean;
  canBike: boolean;
  canCar: boolean;
  carRestriction?: string;
}

export interface Boarder {
  firstName: string;
  lastName: string;
  name: string;
  dorm: string;
  email: string;
  type: BoarderType;
  uid: string;
  permissions: BoarderPermissions;
  startDate: string;
  endDate: string;
  isActive: boolean;
}