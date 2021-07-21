export interface CheckInItem {
  name: string;
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
