import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicYearPickerComponent } from './academic-year-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AcademicYearPickerComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  exports: [
    AcademicYearPickerComponent
  ]
})
export class AcademicYearPickerModule { }
