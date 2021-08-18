import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeBasedExcusalFormComponent } from './time-based-excusal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    TimeBasedExcusalFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FlexLayoutModule
  ],
  exports: [
    TimeBasedExcusalFormComponent
  ]
})
export class TimeBasedExcusalFormModule { }
