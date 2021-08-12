import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import {
  RoomInspectionMetaDoc,
  RoomInspectionStudentDoc,
} from '@reslife/room-inspection-model';

@Injectable({
  providedIn: 'root',
})
export class RoomInspectionDataService {
  private selectedInspectionMetaDoc!: AngularFirestoreDocument<RoomInspectionMetaDoc>;
  constructor(private af: AngularFirestore) {}

  setInspection(id: string): void {
    this.selectedInspectionMetaDoc = this.af.doc<RoomInspectionMetaDoc>(
      'roomInspections/' + id
    );
  }

  getToInspect(): Observable<RoomInspectionStudentDoc[]> {
    if (this.selectedInspectionMetaDoc) {
      return this.selectedInspectionMetaDoc
        .collection<RoomInspectionStudentDoc>('students', (ref) =>
          ref.where('result', '==', 'pending').orderBy('name')
        )
        .valueChanges();
    } else {
      return of([]);
    }
  }

  getInspected(): Observable<RoomInspectionStudentDoc[]> {
    if (this.selectedInspectionMetaDoc) {
      return this.selectedInspectionMetaDoc
        .collection<RoomInspectionStudentDoc>('students', (ref) =>
          ref.where('result', '!=', 'pending').orderBy('name')
        )
        .valueChanges();
    } else {
      return of([]);
    }
  }

  saveInspection(doc: RoomInspectionStudentDoc): Promise<void> {
    if (this.selectedInspectionMetaDoc) {
      if (doc.note === '') {
        delete doc.note;
      }
      return this.selectedInspectionMetaDoc
        .collection('students')
        .doc(doc.uid)
        .update(doc);
    }
    return new Promise(() => {return});
  }
}
