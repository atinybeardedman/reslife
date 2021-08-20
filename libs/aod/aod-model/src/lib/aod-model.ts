import { SimpleItem } from '@reslife/shared-models';

export interface RecordAction<T> {
  record: T;
  action: 'edit' | 'delete';
}

export interface TimeExcusalDoc {
  boarder: SimpleItem;
  uid: string;
  leaveDate: string;
  returnDate: string;
  reason: string;
  clear: boolean;
}
