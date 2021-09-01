import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  MaintenanceRequest,
  MaintenanceRequestDoc,
} from '@reslife/maintenance-request-model';
import { DormDocument } from '@reslife/shared-models';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '@reslife/auth-data-access';
import { StaffMember } from '@reslife/admin-model';
@Injectable({
  providedIn: 'root',
})
export class MaintenanceRequestDataService {
  constructor(private af: AngularFirestore, private auth: AuthenticationService) {}

  getRequests(): Observable<MaintenanceRequestDoc[]> {
    return this.af
      .collection<MaintenanceRequestDoc>('maintenanceRequests', (ref) =>
        ref.orderBy('date', 'desc').limit(25)
      )
      .valueChanges();
  }

  async addRequest(request: MaintenanceRequest): Promise<void> {
    const {name, email, uid} = await this.auth.getUser().pipe(take(1)).toPromise() as StaffMember;
    const doc: MaintenanceRequestDoc = {
      ...request,
      uid: this.af.createId(),
      requestor: {
       name,
       email,
       uid
      },
    };
    return this.af.doc(`maintenanceRequests/${doc.uid}`).set(doc);
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
