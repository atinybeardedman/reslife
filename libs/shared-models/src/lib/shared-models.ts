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
  type: BoarderType;
  uid: string;
  permissions: BoarderPermissions;
  start: string;
  end?: string;
  isActive: boolean;
}

export type Role = 'aod' | 'superadmin' | 'any';

export interface NavigationItem {
  path: string;
  name: string;
  icon: string;
  roles?: Role[];
}