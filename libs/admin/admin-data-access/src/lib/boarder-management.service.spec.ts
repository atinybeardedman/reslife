import { TestBed } from '@angular/core/testing';

import { BoarderManagementService } from './boarder-management.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
describe('BoarderManagementService', () => {
  let service: BoarderManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp({
        projectId: 'test',
      }),
    ],
    providers: [BoarderManagementService, AngularFirestore],
    });
    service = TestBed.inject(BoarderManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
