import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeBasedExcusalTableComponent } from './time-based-excusal-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    TimeBasedExcusalTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  exports: [
    TimeBasedExcusalTableComponent
  ]
})
export class TimeBasedExcusalTableModule { }
