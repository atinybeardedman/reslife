import { AcademicYear, LeaveStayRequest, NamedTimeSpan, ScheduleDayException, ScheduleItem, StaffMember } from "./admin-model";

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

export const testBreak: NamedTimeSpan = {
    uid: '1',
    name: 'Thanksgiving Break',
    start: '2020-11-18',
    end: '2020-11-30'
};

export const testAcademicYear: AcademicYear = {
    name: '2020-21',
    uid: '2020-21',
    start: '2020-09-10',
    end: '2021-06-10',
}

export const testStayRequest: LeaveStayRequest = {
    uid: '1',
    student: {
        name: 'Test Boarder 1',
        uid: '1',
        email: 'boarder1@oakwoodfriends.org'
    },
    type: 'Stay',
    explaination: 'Staying this weekend for the basketball game on Saturday',
    startDate: '2021-09-10T17:00:00-04:00',
    endDate: '2021-09-12T19:00:00-04:00',
    status: 'Pending',
    academicYear: '2021-22'
};

export const testLeaveRequest: LeaveStayRequest = {
    uid: '2',
    student: {
        name: 'Test Boarder 2',
        uid: '2',
        email: 'boarder2@oakwoodfriends.org'
    },
    type: 'Leave',
    explaination: 'Going on a college visit',
    startDate: '2021-09-11T10:00:00-04:00',
    endDate: '2021-09-12T19:00:00-04:00',
    status: 'Pending',
    academicYear: '2021-22'
};