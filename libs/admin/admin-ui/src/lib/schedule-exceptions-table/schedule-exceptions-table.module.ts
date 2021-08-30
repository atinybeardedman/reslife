import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleExceptionsTableComponent } from './schedule-exceptions-table.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    ScheduleExceptionsTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    FlexLayoutModule
  ],
  exports: [
    ScheduleExceptionsTableComponent
  ]
})
export class ScheduleExceptionsTableModule { }
