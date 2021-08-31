import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { LeaveRequest, StayRequest } from '@reslife/request-model';

@Injectable({
  providedIn: 'root',
})
export class RequestDataService {
    constructor(private af: AngularFirestore){}

    async submitLeave(user: firebase.User | null, request: LeaveRequest): Promise<void> {
        if(user){
            request.email = user.email as string;
            request.uid = user.uid;
            return this.af.doc<LeaveRequest>(`leave-requests/${request.uid}`).set(request);
        }
    }

    async submitStay(user: firebase.User | null, request: StayRequest): Promise<void> {
        if(user){
            request.email = user.email as string;
            request.uid = user.uid;
            return this.af.doc<StayRequest>(`stay-requests/${request.uid}`).set(request);
        }
    }
}