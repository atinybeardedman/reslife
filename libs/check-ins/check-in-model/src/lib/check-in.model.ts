import { NamedItem } from '@reslife/shared-models';
export interface CheckInItem extends NamedItem {
  uid: string;
}

export type CheckInCode = 'LT';

export interface CheckInRecord extends CheckInItem{
  code?: string;
}

export interface ExcusedRecord extends CheckInItem {
  note: string;
}

export type ChecklistType = 'To Check' | 'Checked In' | 'Excused';

export interface CheckInDocument {
  date: string;
  'check-in': string;
  start: string;
  end: string;
}