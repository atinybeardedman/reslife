import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NewAcademicYearModalComponent } from './new-academic-year-modal.component';



@NgModule({
  declarations: [
    NewAcademicYearModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    NewAcademicYearModalComponent
  ]
})
export class NewAcademicYearModalModule { }
