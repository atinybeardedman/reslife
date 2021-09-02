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

export interface TaskOptions {
  alwaysRun?: boolean; // will run even on break
}

export interface RepeatedTask {
  ID: string;
  repeatFrequency: 'daily' | 'dormdays' | 'weekdays' | 'weekly' | 'monthly';
  functionName: string;
  active: boolean;
  startDate: string;
  endDate: string;
  options: TaskOptions;
}

export interface OneTimeTask {
  ID: string;
  status: 'scheduled' | 'complete' | 'error';
  functionName: string;
  triggerTime: string;
  isRepeat: boolean;
  repeatID?: string;
  options?: TaskOptions;
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

export type RoomInspectionResult = 'pending' | 'passed' | 'failed';


export interface RoomInspectionStudentDoc {
  uid: string;
  name: string;
  email: string;
  result: RoomInspectionResult;
  note?: string;
}

export interface RoomInspectionMetaDoc {
  date: string;
  dorm: string;
  uid: string;
  // contains students sub-collection
}

export interface NamedItem {
  name: string;
}

export interface SimpleItem extends NamedItem {
  uid: string;
}

export interface NamedTimeSpan extends SimpleItem {
  start: string;
  end: string;
}

// This is the same interface, duplicating for semantics 
export interface AcademicYear extends NamedTimeSpan {
  uid: string;
}

export interface DormDocument extends SimpleItem {
  isActive: boolean;
}

export interface CheckInDocument {
  date: string;
  'check-in': string;
  start: string;
  end: string;
}

export interface DormNoteMetaDoc {
  date: string;
  dorm: string;
}

export interface DormNoteField {
  uid: string;
  fieldName: string;
  note: string;
  order: number;
  isLocked: boolean;
  author?: string;
}