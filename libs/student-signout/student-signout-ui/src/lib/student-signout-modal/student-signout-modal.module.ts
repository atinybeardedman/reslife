import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentSignoutModalComponent } from './student-signout-modal.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    StudentSignoutModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: [
    StudentSignoutModalComponent
  ]
})
export class StudentSignoutModalModule { }
