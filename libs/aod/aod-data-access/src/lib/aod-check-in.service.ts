import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { getDateString } from '@reslife/utils';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckInDocument } from '@reslife/check-ins/check-in-model';
@Injectable({
  providedIn: 'root'
})
export class AodCheckInService {

  constructor(private af: AngularFirestore) { }

  getCheckIns(): Observable<string[]> {
    const date = getDateString();
    const checkInCollection = this.af.collection<CheckInDocument>(
      'check-ins',
      (ref) => ref.where('date', '==', date).orderBy('start')
    );
    return checkInCollection.valueChanges().pipe(
      map(docs => docs.map(d => d['check-in']))
    );
  }
}
