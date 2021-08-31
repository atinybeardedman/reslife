import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  async login(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        hd: 'oakwoodfriends.org'
    })
    const cred = await this.auth.signInWithPopup(provider);
    if(cred.credential){
        const user = await this.auth.currentUser;
        const token = await user?.getIdTokenResult();
        const email = token?.claims.email;
        if(!email.includes('oakwoodfriends.org')){
            // TODO: delete extra emails that don't match
            throw new Error('Email must match domain')
        }
    }
  }

  async logout() {
    await this.auth.signOut();
  }
}
