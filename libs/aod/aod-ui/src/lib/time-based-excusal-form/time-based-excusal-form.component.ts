import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getTime, combineDatetime } from '@reslife/utils'
import { LeaveReturnTiming } from '@reslife/shared-models';
import { Subscription } from 'rxjs';
@Component({
  selector: 'reslife-time-based-excusal-form',
  templateUrl: './time-based-excusal-form.component.html',
  styleUrls: ['./time-based-excusal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeBasedExcusalFormComponent {
  timeExcusalForm!: FormGroup;
  departureGroup!: FormGroup;
  returnGroup!: FormGroup; 
  subscription: Subscription;
  @Output() timing = new EventEmitter<LeaveReturnTiming | null>();
  constructor(fb: FormBuilder) {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 3600 * 1000);
    this.departureGroup = fb.group({
      departureDateCtrl: [today, Validators.required],
      departureTimeCtrl: [getTime(today), Validators.required]
    });
    this.returnGroup = fb.group({
      returnDateCtrl: [tomorrow, Validators.required],
      returnTimeCtrl: ['', Validators.required]
    });

    this.timeExcusalForm = fb.group({
      departureGroup: this.departureGroup,
      returnGroup: this.returnGroup,
    });

    this.subscription = this.timeExcusalForm.valueChanges.subscribe(val => {
      if(this.timeExcusalForm.valid){
        const {departureDateCtrl, departureTimeCtrl} = this.departureGroup.controls;
        const { returnDateCtrl, returnTimeCtrl} = this.returnGroup.controls;
        const leaveDate =  combineDatetime(new Date(departureDateCtrl.value), departureTimeCtrl.value).toISOString();
        const returnDate =  combineDatetime(new Date(returnDateCtrl.value), returnTimeCtrl.value).toISOString();
        this.timing.emit({
          leaveDate,
          returnDate
        });
      } else {
        this.timing.emit(null);
      }
    })
   }


}
