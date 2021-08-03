import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Boarder, DormDocument } from '@reslife/shared-models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoarderManagementService {
  constructor(private af: AngularFirestore) {}

  getActiveBoarders(): Observable<Boarder[]> {
    return this.af
      .collection<Boarder>('boarders', (ref) =>
        ref.where('isActive', '==', true)
      )
      .valueChanges();
  }

  getActiveDorms(): Observable<string[]> {
    return this.af
      .collection<DormDocument>('dorms', (ref) =>
        ref.where('isActive', '==', true)
      )
      .valueChanges()
      .pipe(map((docs) => docs.map((d) => d.name)));
  }

  addBoarder(boarder: Boarder): Promise<void> {
    const uid = this.af.createId();
    boarder.uid = uid;
    return this.af.collection('boarders').doc(uid).set(boarder);
  
  }

  updateBoarder(boarder: Boarder): Promise<void> {
    const uid = boarder.uid;
    return this.af.doc(`boarders/${uid}`).update(boarder);
  }
}
