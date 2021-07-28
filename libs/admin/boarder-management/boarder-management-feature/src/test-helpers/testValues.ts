import { Boarder } from "@reslife/shared-models";

export const testBoarder: Boarder = {
    name: 'Test',
    dorm: 'dorm',
    email: 'test@example.com',
    type: '7 Day',
    permissions: {
      canWalk: true,
      canBike: true,
      canDrive: true
    },
    isActive: true,
    start: '2021-06-01',
    uid: '1234'
};