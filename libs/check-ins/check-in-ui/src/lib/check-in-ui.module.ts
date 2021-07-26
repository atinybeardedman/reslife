import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInChoiceModule } from './check-in-choice/check-in-choice.module';
import { CheckListModule } from './checklist/checklist.module';

@NgModule({
  imports: [CommonModule, CheckInChoiceModule, CheckListModule],
  exports: [ CheckInChoiceModule, CheckListModule]
})
export class CheckInUiModule {}
