import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AcademicYear, NamedTimeSpan } from '@reslife/admin-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {

  constructor(private af: AngularFirestore) { }

  getYears(): Observable<AcademicYear[]> {
    return this.af.collection<AcademicYear>('academic-years').valueChanges();
  }

  getBreaks(year: string): Observable<NamedTimeSpan[]> {
    return this.af.doc(`academic-years/${year}`).collection<NamedTimeSpan>('breaks', ref => ref.orderBy('start')).valueChanges();
  }

  setYear(year: AcademicYear): Promise<void> {
    return this.af.doc(`academic-years/${year.uid}`).set(year);
  }

  setBreaks(year: string, breaks: NamedTimeSpan[]): Promise<void> {
    const batch = this.af.firestore.batch();
    const yearDoc = this.af.doc(`academic-years/${year}`);
    for(const b of breaks){
      if(b.uid.includes('temp+')){
        b.uid = this.af.createId();
        const doc = yearDoc.collection<NamedTimeSpan>('breaks').doc(b.uid);
        batch.set(doc.ref, b);
      } else {
        const doc = yearDoc.collection<NamedTimeSpan>('breaks').doc(b.uid);
        batch.update(doc.ref, b);
      }
    }
    return batch.commit();
  }
}
