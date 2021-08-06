import { BoarderSignoutMeta, StudentSignout } from "./student-signout-model";

export const allPermissionsTest: BoarderSignoutMeta = {
    name: 'Test Boarder 1',
    uid: '1',
    permissions: {
        canWalk: true,
        canBike: true,
        canCar: true
    },
};

export const partialPermissionsTest: BoarderSignoutMeta = {
    name: 'Test Boarder 2',
    uid: '2',
    permissions: {
        canWalk: true,
        canBike: false,
        canCar: false
    },
};

export const carRestrictionTest: BoarderSignoutMeta = {
    name: 'Test Boarder 3',
    uid: '3',
    permissions: {
        canWalk: true,
        canBike: true,
        canCar: true,
        carRestriction: 'No Student Drivers'
    },
};

export const campusedTest: BoarderSignoutMeta = {
    name: 'Test Boarder 4',
    uid: '4',
    permissions: {
        canWalk: true,
        canBike: true,
        canCar: true,
        carRestriction: 'No Student Drivers'
    },
    isCampused: true
}

export const testCurrentSignout: StudentSignout = {
    student: {
        name: 'Test Boarder 1',
        uid: '1234'
    },
    destination: 'Starbucks',
    transport: 'Car',
    transportNote: 'Uber',
    timeOut: new Date().toISOString(),
    isCurrentlyOut: true,
    uid: 'a'
}