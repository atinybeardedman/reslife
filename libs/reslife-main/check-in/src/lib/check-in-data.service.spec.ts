import { TestBed } from '@angular/core/testing';

import { CheckInDataService } from './check-in-data.service';

describe('CheckInDataService', () => {
  let service: CheckInDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckInDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
