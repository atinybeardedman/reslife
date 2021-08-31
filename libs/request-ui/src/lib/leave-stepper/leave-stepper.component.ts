import { Component,ChangeDetectionStrategy, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveRequest } from '@reslife/request-model';
import { combineDatetime } from '@reslife/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'reslife-leave-stepper',
  templateUrl: './leave-stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveStepperComponent implements OnInit, OnDestroy {

  @Output() save = new EventEmitter<LeaveRequest>();
  subscription!: Subscription;
  whereStep = new FormGroup({
    whereCtrl: new FormControl('', Validators.required),
    transportCtrl: new FormControl('', Validators.required),
    otherTransportCtrl: new FormControl('')
  });
  startGroup = new FormGroup({
    dateCtrl: new FormControl('', Validators.required),
    timeCtrl: new FormControl('', Validators.required),
  });
  endGroup = new FormGroup({
    dateCtrl: new FormControl('', Validators.required),
    timeCtrl: new FormControl('', Validators.required),
  });
  whenStep = new FormGroup({
    start: this.startGroup,
    end: this.endGroup,
  });

  ngOnInit(){
   this.subscription = this.whereStep.controls.transportCtrl.valueChanges.subscribe(val => {
     if(val === 'other'){
       this.whereStep.controls.otherTransportCtrl.setValidators(Validators.required)
     } else {
      this.whereStep.controls.otherTransportCtrl.setValidators([]);
     }
     this.whereStep.controls.otherTransportCtrl.updateValueAndValidity();
   })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  get leaveRequest(): LeaveRequest {
    const startDate = combineDatetime(
      new Date(this.startGroup.controls.dateCtrl.value),
      this.startGroup.controls.timeCtrl.value
    ).toISOString();
    const endDate = combineDatetime(
      new Date(this.endGroup.controls.dateCtrl.value),
      this.endGroup.controls.timeCtrl.value
    ).toISOString();
    const where = this.whereStep.controls.whereCtrl.value;
    const transport = this.whereStep.controls.transportCtrl.value;
    const otherTransport = this.whereStep.controls.otherTransportCtrl.value;
    const request: LeaveRequest = {
      email: '',
      uid: '',
      where,
      startDate,
      endDate,
      transport: transport === 'other' ? otherTransport : transport
    };
    return request;
  }
}
