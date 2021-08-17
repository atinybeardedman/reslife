import { DormNoteField } from "./dorm-notes-model";



export const uninitializedField: DormNoteField =  {
    
    uid: '1',
    order: 1,
    fieldName: 'Room Inspections',
    note: '',
    isLocked: false,
    
};

export const filledField: DormNoteField =  {
    uid: '2',
    order: 2,
    fieldName: 'Check In',
    note: 'Test Student 1 was very sleeping through check in again.',
    isLocked: false,
    author: 'Test Faculty 1'
};

export const lockedField: DormNoteField = {
    uid: '3',
    order: 3,
    fieldName: 'Other Notes',
    note: 'Nothing else of note',
    isLocked: true,
    author: 'Test Faculty 1'
}

export const testFields: DormNoteField[] = [
    uninitializedField,
    filledField
];