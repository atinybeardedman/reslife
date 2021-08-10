import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  MaintenanceRequest,
  MaintenanceRequestDoc,
} from '@reslife/maintenance-request-model';
import { DormDocument } from '@reslife/shared-models';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class MaintenanceRequestDataService {
  constructor(private af: AngularFirestore) {}

  getRequests(): Observable<MaintenanceRequestDoc[]> {
    return this.af
      .collection<MaintenanceRequestDoc>('maintenanceRequests', (ref) =>
        ref.orderBy('date', 'desc').limit(25)
      )
      .valueChanges();
  }

  addRequest(request: MaintenanceRequest): Promise<void> {
    const uid = this.af.createId();
    const doc: MaintenanceRequestDoc = {
      ...request,
      uid,
      requestor: {
        name: 'Test Faculty',
        email: 't@oakwoodfriends.org',
        uid: 't',
      },
    };
    return this.af.doc(`maintenanceRequests/${uid}`).set(doc);
  }

  getActiveDorms(): Observable<string[]> {
    return this.af
      .collection<DormDocument>('dorms', (ref) =>
        ref.where('isActive', '==', true)
      )
      .valueChanges()
      .pipe(map((docs) => docs.map((d) => d.name)));
  }
}
