import { Boarder, CampusedStudentRecord } from "./shared-models";

export const testBoarder: Boarder = {
    firstName: 'Elizabeth (Liz)',
    lastName: 'Friedman',
    name: 'Elizabeth (Liz) Friedman',
    email: 'efriedman@oakwoodfriends.org',
    type: '7 Day',
    dorm: 'Newlin',
    permissions: {
      canWalk: true,
      canBike: false,
      canCar: true,
      carRestriction: 'No Student Drivers',
    },
    uid: '1234',
    startDate: '2021-07-01',
    endDate: '2022-06-30',
    isActive: true,
  };

export const testCampusedRecord: CampusedStudentRecord = {
  student: {
    name: 'Test Boarder',
    uid: '1234',  
  },
  uid: '1',
  startDate: '2021-09-14',
  endDate: '2021-09-30'
};