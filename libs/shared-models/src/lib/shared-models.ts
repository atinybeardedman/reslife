export interface NamedItem {
  name: string;
}

export interface SimpleItem extends NamedItem {
  uid: string;
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

export interface DormDocument {
  name: string;
  isActive: boolean;
}

export type Role = 'aod' | 'superadmin' | 'any';

export interface NavigationItem {
  path: string;
  name: string;
  icon: string;
  roles?: Role[];
}

export interface CampusedStudentRecord {
  student: SimpleItem;
  uid: string;
  startDate: string;
  endDate: string;
}

export interface DormDatePickerEvent {
  dorm: string;
  date: string;
}


export interface LeaveReturnTiming {
  leaveDate: string;
  returnDate: string;
}

export interface DashboardCard {
  title: string;
  description: string;
  path: string;
  icon: string;
}

export interface RecordAction<T> {
  record: T;
  action: 'edit' | 'delete';
}