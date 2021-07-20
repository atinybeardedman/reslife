import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInChoiceModule } from './check-in-choice/check-in-choice.module';

@NgModule({
  imports: [CommonModule, CheckInChoiceModule],
  exports: [ CheckInChoiceModule]
})
export class CheckInUiModule {}
