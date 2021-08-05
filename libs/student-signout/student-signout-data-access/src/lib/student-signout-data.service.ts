import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable } from 'rxjs';
import {
  BoarderSignoutMeta,
  StudentSignout,
} from '@reslife/student-signout/student-signout-model';
import { getDateString, getIsoTimezoneString } from '@reslife/utils';
import { Boarder, CampusedStudentRecord } from '@reslife/shared-models';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class StudentSignoutDataService {
  constructor(private af: AngularFirestore) {}

  getCurrentSignouts(): Observable<StudentSignout[]> {
    return this.af.collection<StudentSignout>('signouts', ref => ref.where('isCurrentlyOut','==', true).orderBy('timeOut')).valueChanges();
  }

  getAvailableBoarders(): Observable<BoarderSignoutMeta[]> {
    const currentSignouts$ = this.getCurrentSignouts();
    const campused$ = this.af
      .collection<CampusedStudentRecord>('campusedStudents', (ref) =>
        ref.where('endDate', '>=', getDateString())
      )
      .valueChanges();
    const allBoarders$ = this.af.collection<Boarder>('boarders', ref => ref.where('isActive', '==', true)).valueChanges();
    return combineLatest([allBoarders$, currentSignouts$, campused$]).pipe(
      map(([allBoarders, currentSignouts, campused]) => {
        return allBoarders.filter(b => {
          if(currentSignouts.find(c => c.student.uid === b.uid)){
            return false
          }
          return true;
        }).map(boarder => {
          let isCampused: true | undefined;
          if(campused.find(c => c.uid === boarder.uid)){
            isCampused = true;
          }
          return {
            name: boarder.name,
            uid: boarder.uid,
            permissions: boarder.permissions,
            isCampused
          }
        })
      })
    )
  }

  signIn(signout: StudentSignout): Promise<void> {
    return this.af.doc<StudentSignout>(`signouts/${signout.uid}`).update({
      timeIn: new Date().toISOString(),
      isCurrentlyOut: false
    });
  }

  saveSignout(signout: StudentSignout): Promise<void> {
    if(signout.uid === ''){
      signout.uid = this.af.createId();
      return this.af.doc<StudentSignout>(`signouts/${signout.uid}`).set(signout);
    }
    return this.af.doc<StudentSignout>(`signouts/${signout.uid}`).update(signout);
  }
}
