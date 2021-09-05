import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StayRequest } from '@reslife/request-model';
import { combineDatetime } from '@reslife/utils';
@Component({
  selector: 'reslife-stay-stepper',
  templateUrl: './stay-stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StayStepperComponent {
  @Output() save = new EventEmitter<StayRequest>();
  reasonCtrl = new FormControl('', Validators.required);
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

  get stayRequest(): StayRequest {
    const startDate = combineDatetime(
      new Date(this.startGroup.controls.dateCtrl.value),
      this.startGroup.controls.timeCtrl.value
    ).toISOString();
    const endDate = combineDatetime(
      new Date(this.endGroup.controls.dateCtrl.value),
      this.endGroup.controls.timeCtrl.value
    ).toISOString();
    const reason = this.reasonCtrl.value;
    const request: StayRequest = {
      email: '',
      name: '',
      uid: '',
      reason,
      startDate,
      endDate
    };
    return request;
  }
}
