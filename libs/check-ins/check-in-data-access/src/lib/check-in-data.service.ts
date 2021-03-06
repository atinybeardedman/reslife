import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import {
  CheckInDocument,
  CheckInItem,
  CheckInRecord,
  ExcusedRecord,
} from '@reslife/check-ins/check-in-model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { getTimeDiff, combineDatetime, getTime, orderByName } from '@reslife/utils';

@Injectable({
  providedIn: 'root',
})
export class CheckInDataService {
  private selectedCheckInDocument!: AngularFirestoreDocument<CheckInDocument> | null;
  constructor(private af: AngularFirestore) {}

  unSetCheckIn(){
    this.selectedCheckInDocument = null;
  }

  setCheckIn(date: string, checkin: string): void {
    if (date && checkin) {
      this.selectedCheckInDocument = this.af.doc<CheckInDocument>(
        `check-ins/${date}+${checkin}`
      );
    }
  }

  getCheckInDocs(date: string): Observable<CheckInDocument[]> {
    const checkInCollection = this.af.collection<CheckInDocument>(
      'check-ins',
      (ref) => ref.where('date', '==', date).orderBy('start')
    );
    return checkInCollection.valueChanges();
  }

  getSuggestedCheckIn(choices: CheckInDocument[]): string {
    if (choices.length === 0) {
      return '';
    }
    if(choices.length === 1){
      return choices[0]['check-in'];
    }
    const time = getTime();

    const choice = choices.find((c) => {
      return time < c.end;
    });
    return typeof choice !== 'undefined'
      ? choice['check-in']
      : choices[choices.length - 1]['check-in'];
  }

  getToCheck(): Observable<CheckInItem[]> {
    if (this.selectedCheckInDocument) {
      return this.selectedCheckInDocument
        .collection<CheckInItem>('expected')
        .valueChanges()
        .pipe(
          map(items => items.sort(orderByName))
        );
    } else {
      return of([]);
    }
  }
  getChecked(): Observable<CheckInRecord[]> {
    if (this.selectedCheckInDocument) {
      return this.selectedCheckInDocument
        .collection<CheckInRecord>('checked')
        .valueChanges()
        .pipe(
          map(items => items.sort(orderByName))
        );
    } else {
      return of([]);
    }
  }
  getExcused(): Observable<ExcusedRecord[]> {
    if (this.selectedCheckInDocument) {
      return this.selectedCheckInDocument
        .collection<ExcusedRecord>('excused')
        .valueChanges()
        .pipe(
          map(items => items.sort(orderByName))
        );
    } else {
      return of([]);
    }
  }
  async checkIn(item: CheckInItem): Promise<void> {
    const record: CheckInRecord = { ...item };

    if (this.selectedCheckInDocument) {
      const snap = await this.selectedCheckInDocument.get().toPromise();
      const endTime = snap.get('end') as string;
      const endDate = combineDatetime(new Date(), endTime);
      const currentTime = new Date();
      const timeDiff = getTimeDiff(endDate, currentTime);
      if (timeDiff > 5) {
        record.code = 'LT';
      }
      const batch = this.af.firestore.batch();
      batch.delete(
        this.selectedCheckInDocument.collection('expected').doc(item.uid).ref
        );
        batch.set(
          this.selectedCheckInDocument.collection('checked').doc(item.uid).ref,
          record
          );
          return batch.commit();
        }
  }

  async unCheckIn(record: CheckInRecord): Promise<void> {
    const item: CheckInItem = {
      uid: record.uid,
      name: record.name,
    };

    if (this.selectedCheckInDocument) {

      const batch = this.af.firestore.batch();
  
      batch.set(
        this.selectedCheckInDocument.collection('expected').doc(item.uid).ref,
        item
      );
      batch.delete(
        this.selectedCheckInDocument.collection('checked').doc(item.uid).ref
      );
  
      return batch.commit();
    }
  }
}
