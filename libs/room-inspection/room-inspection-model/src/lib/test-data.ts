import { RoomInspectionStudentDoc} from './room-inspection.model'
export const pendingInspectionDoc: RoomInspectionStudentDoc = {
    uid: '1234',
    name: 'Test Student',
    email: 't@example.com',
    result: 'pending'
}

export const passedInspectionDoc: RoomInspectionStudentDoc = {
    uid: '1234',
    name: 'Test Student',
    email: 't@example.com',
    result: 'passed'
}

export const failedInspectionDoc: RoomInspectionStudentDoc = {
    uid: '1234',
    name: 'Test Student',
    email: 't@example.com',
    result: 'failed'
} 