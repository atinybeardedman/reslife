import { ScheduleDayException, ScheduleItem, StaffMember } from "./admin-model";

export const testStaffMember: StaffMember = {
    name: 'Test Faculty 1',
    uid: '1',
    email: 'tfaculty@oakwoodfriends.org',
    roles: []
};

export const testAod: StaffMember = {
    name: 'Test AOD',
    uid: '2',
    email: 'aod@oakwoodfriends.org',
    roles: ['aod']
};

export const testDinnerScheduleItem: ScheduleItem = {
    name: 'Dinner',
    uid: '1',
    startTime: '17:45',
    endTime: '18:15',
    days: [0,1,2,3,4,5,6],
    academicYear: '2021-22'
};
export const testBrunchScheduleItem: ScheduleItem = {
    name: 'Brunch',
    uid: '2',
    startTime: '11:45',
    endTime: '12:30',
    days: [0,6],
    academicYear: '2021-22'
};

export const testExceptionDay: ScheduleDayException = {
    uid: '1',
    date: '2021-09-10',
    note: 'No Brunch',
    checkIns: [
        {
            "check-in": 'Dinner',
            startTime: '17:30',
            endTime: '18:15'
        }
    ],
    academicYear: '2021-22'
};