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