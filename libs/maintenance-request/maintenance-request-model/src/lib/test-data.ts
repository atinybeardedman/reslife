import { MaintenanceRequest, MaintenanceRequestDoc } from '../lib/maintenance-request-model';
export const testRequests: MaintenanceRequestDoc[] = [
  {
    subject: 'Leaky Faucet',
    building: 'Reagan',
    room: '1st Floor Bathroom',
    request: 'The sink has a leaky faucet.',
    date: '2021-08-01',
    requestor: {
      name: 'Faculty 1',
      uid: '1',
      email: 'f1@example.com',
    },
    uid: '1',
  },
  {
    subject: 'No Hot Water',
    building: 'Newlin',
    request:
      "We didn't have any hot water last night. Could you look into it? Thanks.",
    date: '2021-07-15',
    requestor: {
      name: 'Faculty 2',
      uid: '2',
      email: 'f2@example.com',
    },
    uid: '2',
  },
  {
    subject: 'Light out',
    building: 'Reagan',
    room: 'R205',
    request: 'The main light is out.',
    date: '2021-06-22',
    requestor: {
      name: 'Faculty 3',
      uid: '3',
      email: 'f3@example.com',
    },
    uid: '3',
  },
  {
    subject: 'Door sealing coming off',
    building: 'Reagan',
    request:
      'The sealing around the door is coming off and it makes it hard to open the door. When you open the door you also walk into it and get scratched by it.',
    date: '2021-06-15',
    requestor: {
      name: 'Faculty 4',
      uid: '4',
      email: 'f4@example.com',
    },
    uid: '4',
  },
];

export const testRequest: MaintenanceRequest = {
  subject: 'Heat not Working',
  room: 'R201',
  building: 'Reagan',
  request: 'The heat seems to not be working in this room. Maybe they can get a space heater?',
  date: '2021-06-01'
}