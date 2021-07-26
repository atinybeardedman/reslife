import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

import { CheckInDataService } from './check-in-data.service';
import { getTime } from '@reslife/utils';
jest.mock('@reslife/utils', () => {
  return {
    getTime: jest.fn(),
  };
});

const mockedGetTime = getTime as jest.MockedFunction<typeof getTime>;

describe('CheckInDataService', () => {
  let service: CheckInDataService;
  let afService: AngularFirestore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp({
          projectId: 'test',
        }),
      ],
      providers: [CheckInDataService, AngularFirestore],
    });
    service = TestBed.inject(CheckInDataService);
    TestBed.inject(AngularFirestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('It should get the correct suggested check-in', () => {
    const checkInDocs = [
      {
        date: '2021-09-11',
        'check-in': 'Brunch',
        start: '11:30',
        end: '12:30',
      },
      {
        date: '2021-09-11',
        'check-in': 'Dinner',
        start: '17:45',
        end: '18:30',
      },
      {
        date: '2021-09-11',
        'check-in': 'Dorm',
        start: '22:00',
        end: '22:10',
      },
    ];
    beforeEach(() => {
      jest.clearAllMocks()
    });
    
    it('should return a null string if no checkInDocs are given', () => {
      expect(service.getSuggestedCheckIn([])).toBe('');
    })
    
    it('should suggest the first check in if the current time is before all check-ins', () => {
      mockedGetTime.mockReturnValueOnce('10:00');
      const checkIn = service.getSuggestedCheckIn(checkInDocs);
      expect(checkIn).toEqual(checkInDocs[0]['check-in']);
    });

    it('should suggest the current check in if the time is between start and end', () => {
      mockedGetTime.mockReturnValueOnce('12:00');
      const checkIn = service.getSuggestedCheckIn(checkInDocs);
      expect(checkIn).toEqual(checkInDocs[0]['check-in']);
    });
    it('should suggest the next check in if the time is after one check in but before another starts', () => {
      mockedGetTime.mockReturnValueOnce('13:00');
      const checkIn = service.getSuggestedCheckIn(checkInDocs);
      expect(checkIn).toEqual(checkInDocs[1]['check-in']);
    });
    it('should suggest the last check in if the time is after all check ins', () => {
      mockedGetTime.mockReturnValueOnce('23:00');
      const checkIn = service.getSuggestedCheckIn(checkInDocs);
      expect(checkIn).toEqual(checkInDocs[2]['check-in']);
    });
  })

});
