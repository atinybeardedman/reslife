import { RoomInspectionStudentDoc } from './room-inspection.model';
export const pendingInspectionDoc: RoomInspectionStudentDoc = {
  uid: '1234',
  name: 'Test Student',
  email: 't@example.com',
  result: 'pending',
};

export const passedInspectionDoc: RoomInspectionStudentDoc = {
  uid: '1234',
  name: 'Test Student',
  email: 't@example.com',
  result: 'passed',
};

export const failedInspectionDoc: RoomInspectionStudentDoc = {
  uid: '1234',
  name: 'Test Student',
  email: 't@example.com',
  result: 'failed',
};

export function generateDocs(): RoomInspectionStudentDoc[] {
  return [
    pendingInspectionDoc,
    pendingInspectionDoc,
    passedInspectionDoc,
    passedInspectionDoc,
    failedInspectionDoc,
    {...failedInspectionDoc, note: 'Trash'},
  ].map((d, i) => ({ ...d, name: d.name + ' ' + (i + 1), uid: '' + (i + 1) }));
}
