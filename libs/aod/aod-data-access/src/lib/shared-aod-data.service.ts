import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Boarder } from '@reslife/shared-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedAodDataService {

  constructor(private af: AngularFirestore) { }

  getActiveBoarders(): Observable<Boarder[]> {
    return this.af
      .collection<Boarder>('boarders', (ref) =>
        ref.where('isActive', '==', true)
      )
      .valueChanges();
  }
}
