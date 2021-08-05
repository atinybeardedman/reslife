import { BoarderPermissions } from '@reslife/shared-models';

export type TransportMethod = 'Walk' | 'Bike' | 'Car';

export interface StudentSignout {
  student: {
    name: string;
    uid: string;
  };
  timeOut: string;
  timeIn?: string;
  destination: string;
  transport: TransportMethod;
  transportNote?: string; // only set if there's a car
  isCurrentlyOut: boolean;
  uid: string;
}

/**
 * Contains only the boarder information needed to sign them out, including a campused flag
 */
export interface BoarderSignoutMeta {
  name: string;
  uid: string;
  permissions: BoarderPermissions;
  isCampused?: true; 
}
