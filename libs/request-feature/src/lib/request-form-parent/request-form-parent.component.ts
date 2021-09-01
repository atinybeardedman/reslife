import { Component,  ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AuthService, RequestDataService } from '@reslife/request-data-access';
import { LeaveRequest, StayRequest } from '@reslife/request-model';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
@Component({
  selector: 'reslife-request-form-parent',
  templateUrl: './request-form-parent.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestFormParentComponent implements OnInit {
  user$!: Observable<firebase.User | null>
  requestType!: 'stay' | 'leave';
  requestSubmitted$ = new Subject<boolean>();

  constructor(private auth: AuthService, private ds: RequestDataService, private router: Router){
  }

  ngOnInit(){
    this.user$ = this.auth.getCurrentUser();
  }

  async logout(){
    await this.auth.logout();
    this.router.navigateByUrl('login');

  }

  async submitStay(request: StayRequest): Promise<void> {
    const user = await this.user$.pipe(take(1)).toPromise();
    await this.ds.submitStay(user, request);
    this.requestSubmitted$.next(true);
  }
  async submitLeave(request: LeaveRequest): Promise<void> {
    const user = await this.user$.pipe(take(1)).toPromise();
    await this.ds.submitLeave(user, request);
    this.requestSubmitted$.next(true);
  }

}
