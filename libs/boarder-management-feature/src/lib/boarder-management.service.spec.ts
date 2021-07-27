import { TestBed } from '@angular/core/testing';

import { BoarderManagementService } from './boarder-management.service';

describe('BoarderManagementService', () => {
  let service: BoarderManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoarderManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
