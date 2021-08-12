export type RoomInspectionResult = 'pending' | 'passed' | 'failed';

export interface RoomInspectionPickerEvent {
    date: string;
    dorm: string;
}

export interface RoomInspectionStudentDoc {
    uid: string;
    name: string;
    email: string;
    result: RoomInspectionResult;
    note?: string;
}

export interface RoomInspectionMetaDoc {
    date: string;
    dorm: string;
    uid: string;
    // contains students sub-collection
}
