import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentSignoutTableComponent } from './student-signout-table.component';



@NgModule({
  declarations: [
    StudentSignoutTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StudentSignoutTableComponent
  ]
})
export class StudentSignoutTableModule { }
