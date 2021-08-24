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