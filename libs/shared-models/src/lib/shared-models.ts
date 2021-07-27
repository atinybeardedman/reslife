export interface NamedItem {
  name: string;
}

export type BoarderType = '5 Day' | '7 Day';

export interface BoarderPermissions {
  canWalk: boolean;
  canBike: boolean;
  canDrive: boolean;
}

export interface Boarder {
  name: string;
  dorm: string;
  email: string;
  phone?: string;
  type: BoarderType;
  uid: string;
  permissions: BoarderPermissions;
  start: string;
  end?: string;
  isActive: boolean;
}