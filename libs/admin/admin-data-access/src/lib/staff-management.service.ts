import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { StaffMember } from '@reslife/admin-model'

@Injectable({
  providedIn: 'root'
})
export class StaffManagementService {

  constructor(private af: AngularFirestore) { }

  getStaff(): Observable<StaffMember[]>{
    return this.af.collection<StaffMember>('staff', ref => ref.orderBy('name')).valueChanges();
  }

  addStaff(member: StaffMember): Promise<void> {
    member.uid = this.af.createId();
    return this.af.doc(`/staff/${member.uid}`).set(member);
  }
  updateStaff(member: StaffMember): Promise<void> {
    return this.af.doc(`/staff/${member.uid}`).update(member);
  }
  deleteStaff(member: StaffMember): Promise<void> {
    return this.af.doc(`/staff/${member.uid}`).delete();
  }
}
