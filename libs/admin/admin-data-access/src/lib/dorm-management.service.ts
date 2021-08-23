import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DormDocument } from '@reslife/shared-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DormManagementService {
  constructor(private af: AngularFirestore) {}

  getDorms(): Observable<DormDocument[]> {
    return this.af.collection<DormDocument>('dorms', ref => ref.orderBy('name')).valueChanges();
  }

  addDorm(dormDoc: DormDocument): Promise<void> {
    dormDoc.uid = this.af.createId();
    return this.af.doc(`dorms/${dormDoc.uid}`).set(dormDoc);
  }
  updateDorm(dormDoc: DormDocument): Promise<void> {
    return this.af.doc(`dorms/${dormDoc.uid}`).update(dormDoc);
  }
  deleteDorm(dormDoc: DormDocument): Promise<void> {
    return this.af.doc(`dorms/${dormDoc.uid}`).delete();
  }
}
