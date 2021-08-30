import { Role, SimpleItem } from '@reslife/shared-models'
export interface StaffMember extends SimpleItem {
    email: string;
    roles: Role[];
}

export const DAYNAMES = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];



export interface ScheduleItem extends SimpleItem {
    startTime: string;
    endTime: string;
    days: number[];
    academicYear: string;
}

export interface CheckInException {
    startTime: string;
    endTime: string;
    'check-in': string;
}

export interface ScheduleDayException {
    uid: string;
    date: string;
    note: string;
    checkIns: CheckInException[];
    academicYear: string;
}

export interface NamedTimeSpan extends SimpleItem {
    start: string;
    end: string;
}

// This is the same interface, duplicating for semantics 
export interface AcademicYear extends NamedTimeSpan {
    uid: string;
}

export interface AcademicYearSaveEvent {
    year: AcademicYear;
    breaks: NamedTimeSpan[]
}

export type RequestType = 'Leave' | 'Stay';

export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveStayRequest {
    uid: string;
    student: {
        name: string;
        uid: string;
        email: string;
    };
    type: RequestType;
    explaination: string;
    startDate: string;
    endDate: string;
    status: RequestStatus;
    rejectionReason?: string;
    academicYear: string;
}