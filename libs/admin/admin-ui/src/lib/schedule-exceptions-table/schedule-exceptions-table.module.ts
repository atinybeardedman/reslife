import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleExceptionsTableComponent } from './schedule-exceptions-table.component';



@NgModule({
  declarations: [
    ScheduleExceptionsTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScheduleExceptionsTableComponent
  ]
})
export class ScheduleExceptionsTableModule { }
