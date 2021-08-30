import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LeaveStayRequest } from '@reslife/admin-model';
import { getAcademicYear, orderByProp } from '@reslife/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProcessRequestsService {
  constructor(private af: AngularFirestore) {}

  getPendingRequests(): Observable<LeaveStayRequest[]> {
    return this.af
      .collection<LeaveStayRequest>('requests', (ref) =>
        ref
          .where('academicYear', '==', getAcademicYear())
          .where('status', '==', 'Pending')
          .orderBy('startDate')
      )
      .valueChanges();
  }

  getPastRequests(): Observable<LeaveStayRequest[]> {
    return this.af
      .collection<LeaveStayRequest>('requests', (ref) =>
        ref
          .where('academicYear', '==', getAcademicYear())
          .where('status', '!=', 'Pending')
      )
      .valueChanges()
      .pipe(
        map((requests) => {
          requests.sort(orderByProp<LeaveStayRequest>('startDate'));
          return requests;
        })
      );
  }

  processRequest(request: LeaveStayRequest): Promise<void> {
    return this.af.doc(`requests/${request.uid}`).update(request);
  }
}
