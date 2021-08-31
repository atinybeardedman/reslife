import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveStepperModule } from './leave-stepper/leave-stepper.module';
import { StayStepperModule } from './stay-stepper/stay-stepper.module';

@NgModule({
  imports: [CommonModule, LeaveStepperModule, StayStepperModule],
  exports: [LeaveStepperModule, StayStepperModule]
})
export class RequestUiModule {}
