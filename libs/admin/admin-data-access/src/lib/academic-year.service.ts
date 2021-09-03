import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AcademicYear, NamedTimeSpan } from '@reslife/admin-model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AcademicYearService {
  constructor(private af: AngularFirestore) {}

  getYears(): Observable<AcademicYear[]> {
    return this.af.collection<AcademicYear>('academic-years').valueChanges();
  }

  getBreaks(year: string): Observable<NamedTimeSpan[]> {
    return this.af
      .doc(`academic-years/${year}`)
      .collection<NamedTimeSpan>('breaks', (ref) => ref.orderBy('start'))
      .valueChanges();
  }

  setYear(year: AcademicYear): Promise<void> {
    return this.af.doc(`academic-years/${year.uid}`).set(year);
  }

  async setBreaks(year: string, breaks: NamedTimeSpan[]): Promise<void> {
    const batch = this.af.firestore.batch();
    const yearDoc = this.af.doc(`academic-years/${year}`);
    const currentBreaks = await yearDoc
      .collection<NamedTimeSpan>('breaks')
      .get()
      .pipe(take(1), map(snap => snap.docs.map(d => d.data())))
      .toPromise();
    for (const b of currentBreaks) {
      const updatedBreak = breaks.find(added => added.uid === b.uid);
      if(typeof updatedBreak !== 'undefined'){
        const doc = yearDoc.collection<NamedTimeSpan>('breaks').doc(b.uid);
        batch.update(doc.ref, b);
      } else {
        batch.delete(yearDoc.collection('breaks').doc(b.uid).ref);
      }
    }
    for(const newBreak of breaks.filter(b => b.uid.startsWith('temp'))){
      const doc = yearDoc.collection<NamedTimeSpan>('breaks').doc().ref;
      newBreak.uid = doc.id;
      batch.set(doc, newBreak);
    }
    return batch.commit();
  }
}
