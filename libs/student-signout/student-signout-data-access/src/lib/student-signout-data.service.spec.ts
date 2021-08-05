import { TestBed } from '@angular/core/testing';

import { StudentSignoutDataService } from './student-signout-data.service';

describe('StudentSignoutDataService', () => {
  let service: StudentSignoutDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentSignoutDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
