import { Component,  ChangeDetectionStrategy } from '@angular/core';
import { AuthService, RequestDataService } from '@reslife/request-data-access';
import { LeaveRequest, StayRequest } from '@reslife/request-model';
import { Subject } from 'rxjs';

@Component({
  selector: 'reslife-request-form-parent',
  templateUrl: './request-form-parent.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestFormParentComponent {

  requestType!: 'stay' | 'leave';
  requestSubmitted$ = new Subject<boolean>();

  constructor(private auth: AuthService, private ds: RequestDataService){

  }

  async submitStay(request: StayRequest): Promise<void> {
    const user = await this.auth.getCurrentUser();
    await this.ds.submitStay(user, request);
    this.requestSubmitted$.next(true);
  }
  async submitLeave(request: LeaveRequest): Promise<void> {
    const user = await this.auth.getCurrentUser();
    await this.ds.submitLeave(user, request);
    this.requestSubmitted$.next(true);
  }

}
