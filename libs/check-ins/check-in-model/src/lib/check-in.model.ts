import { NamedItem } from '@reslife/shared-models';
export interface CheckInItem extends NamedItem {
  uid: string;
}

export interface CheckInRecord extends CheckInItem{
  code: string;
  comment?: string;
}

export interface ExcusedRecord extends CheckInItem {
  note: string;
}

export type ChecklistType = 'To Check' | 'Checked In' | 'Excused';
