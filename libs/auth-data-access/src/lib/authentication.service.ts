import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { StaffMember } from '@reslife/admin-model';
import firebase from 'firebase/app';
import { catchError, map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth, private af: AngularFirestore) {}

  async login(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      hd: 'oakwoodfriends.org',
    });
    await this.auth.signInWithPopup(provider);
  }

  async logout() {
    await this.auth.signOut();
  }

  getUser(): Observable<StaffMember | null> {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (user) {
          return this.af
            .doc<StaffMember>(`staff/${user.uid}`)
            .valueChanges()
            .pipe(
              catchError((err) => {
                console.log(err);
                return of(null);
              })
            );
        } else {
          return of(null);
        }
      }),
      map((user) => {
        if (typeof user === 'undefined') {
          return null;
        }
        return user;
      })
    );
  }
}
