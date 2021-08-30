import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { StaffMember } from '@reslife/admin-model'
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user$ = new BehaviorSubject<StaffMember | null>(null);
  constructor(private auth: AngularFireAuth, private af: AngularFirestore) { }

  async login(): Promise<void> {
    const cred = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    if(cred.user){
      const {uid} = cred.user;
      const userDoc = await this.af.doc<StaffMember>(`staff/${uid}`).get().toPromise();
      const user = userDoc.exists ? userDoc.data() as StaffMember : null;
      this.user$.next(user);
    }
  }

  async logout(){
  await this.auth.signOut();
  this.user$.next(null);
  }

  getUser():Observable<StaffMember | null>{
    return this.user$;
  }
}
