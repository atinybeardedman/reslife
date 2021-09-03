import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { getDateString, getIncludedDays } from '@reslife/utils';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  CheckInDocument,
  ExcusedRecord,
} from '@reslife/check-ins/check-in-model';
import { Boarder, LeaveReturnTiming } from '@reslife/shared-models';
import { TimeExcusalDoc } from '@reslife/aod-model';
@Injectable({
  providedIn: 'root',
})
export class AodCheckInService {
  constructor(private af: AngularFirestore) {}

  getCheckIns(): Observable<string[]> {
    const date = getDateString();
    const checkInCollection = this.af.collection<CheckInDocument>(
      'check-ins',
      (ref) => ref.where('date', '==', date).orderBy('start')
    );
    return checkInCollection
      .valueChanges()
      .pipe(map((docs) => docs.map((d) => d['check-in'])));
  }

  excuseByCheckIns(
    boarder: Boarder,
    reason: string,
    checkIns: string[]
  ): Promise<void> {
    const batch = this.af.firestore.batch();

    for (const checkIn of checkIns) {
      const checkInDoc = this.af.doc(`check-ins/${getDateString()}+${checkIn}`);
      batch.delete(checkInDoc.collection('expected').doc(boarder.uid).ref);
      batch.delete(checkInDoc.collection('checked').doc(boarder.uid).ref);
      batch.set(
        checkInDoc.collection('excused').doc<ExcusedRecord>(boarder.uid).ref,
        {
          name: boarder.name,
          uid: boarder.uid,
          note: reason,
        }
      );
    }
    return batch.commit();
  }

  async excuseByTime(
    boarder: Boarder,
    reason: string,
    timing: LeaveReturnTiming
  ): Promise<void> {
    // TODO: create cloud function for actual excusal
    const uid = this.af.createId();
    return this.af.doc<TimeExcusalDoc>(`time-excusals/${uid}`).set({
      boarder: {
        name: boarder.name,
        uid: boarder.uid,
      },
      uid,
      ...timing,
      includedDays: getIncludedDays(timing.leaveDate, timing.returnDate),
      reason,
    });
  }

  getExcusals(date$: Observable<string>): Observable<TimeExcusalDoc[]> {
    return date$.pipe(
      switchMap((date) =>
        this.af
          .collection<TimeExcusalDoc>('time-excusals', (ref) =>
            ref.where('includedDays', 'array-contains', date)
          )
          .valueChanges()
      )
    );
  }

  deleteExcusal(excusal: TimeExcusalDoc): Promise<void> {
    return this.af.doc(`time-excusals/${excusal.uid}`).delete();
  }
}
