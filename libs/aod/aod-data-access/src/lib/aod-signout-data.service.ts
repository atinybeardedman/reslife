import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BoarderPermissions, CampusedStudentRecord } from '@reslife/shared-models';
import { BoarderSignoutMeta, StudentSignout } from '@reslife/student-signout-model';
import { StudentSignoutDataService } from '@reslife/student-signout-data-access'
import { getDateString } from '@reslife/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AodSignoutDataService {
  constructor(private af: AngularFirestore, private ssds: StudentSignoutDataService) {}

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

  getSignoutMetas(): Observable<BoarderSignoutMeta[]> {
    return this.ssds.getAvailableBoarders();
  }

  getBoarderSignoutMeta(uid: string): Observable<BoarderSignoutMeta | null>{
    return this.ssds.getSignoutMetaById(uid);
  }

  addSignout(signout: StudentSignout): Promise<void> {
    return this.ssds.addSignout(signout);
  }

  addOverride(meta: BoarderSignoutMeta, tempPermissions: BoarderPermissions): Promise<void> {
    return this.af.collection('temp-permissions').doc(meta.uid).set({
      uid: meta.uid,
      originalPermissions: meta.permissions,
      tempPermissions
    });
  }


}
