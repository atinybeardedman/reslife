import { Boarder } from "@reslife/shared-models";

export const testBoarder: Boarder = {
    firstName: 'Test',
    lastName: 'Boarder',
    name: 'Test Boarder',
    dorm: 'dorm',
    email: 'test@example.com',
    type: '7 Day',
    permissions: {
      canWalk: true,
      canBike: true,
      canCar: true
    },
    isActive: true,
    startDate: '2021-06-01T08:00:00-04:00',
    uid: '1234'
};