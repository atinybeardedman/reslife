import { SimpleItem } from '@reslife/shared-models';


export interface TimeExcusalDoc {
  boarder: SimpleItem;
  uid: string;
  leaveDate: string;
  returnDate: string;
  includedDays: string[];
  reason: string;
}
