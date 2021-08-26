import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicYearPickerComponent } from './academic-year-picker.component';



@NgModule({
  declarations: [
    AcademicYearPickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AcademicYearPickerComponent
  ]
})
export class AcademicYearPickerModule { }
