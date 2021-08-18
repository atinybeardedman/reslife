import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInBasedExcusalFormModule } from './check-in-based-excusal-form/check-in-based-excusal-form.module';
import { TimeBasedExcusalFormModule } from './time-based-excusal-form/time-based-excusal-form.module';

@NgModule({
  imports: [
    CommonModule,
    CheckInBasedExcusalFormModule,
    TimeBasedExcusalFormModule,
  ],
  exports: [
    CheckInBasedExcusalFormModule,
    TimeBasedExcusalFormModule,
  ]
})
export class AodUiModule {}
