import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CampusedStudentRecord } from '@reslife/shared-models';
import { getDateString } from '@reslife/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AodSignoutDataService {
  constructor(private af: AngularFirestore) {}

  addCampusedRecord(record: CampusedStudentRecord): Promise<void> {
    const uid = this.af.createId();
    record.uid = uid;
    return this.af.doc<CampusedStudentRecord>(`/campused/${uid}`).set(record);
  }
  updateCampusedRecord(record: CampusedStudentRecord): Promise<void> {
    return this.af
      .doc<CampusedStudentRecord>(`/campused/${record.uid}`)
      .update(record);
  }
  deleteCampusedRecord(record: CampusedStudentRecord): Promise<void> {
    return this.af
      .doc<CampusedStudentRecord>(`/campused/${record.uid}`)
      .delete();
  }

  getCampusedStudents(): Observable<CampusedStudentRecord[]> {
    return this.af
      .collection<CampusedStudentRecord>('campused', (ref) =>
        ref.where('endDate', '>=', getDateString())
      )
      .valueChanges();
  }
}
