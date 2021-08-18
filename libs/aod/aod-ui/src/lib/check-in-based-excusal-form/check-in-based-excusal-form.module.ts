import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInBasedExcusalFormComponent } from './check-in-based-excusal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    CheckInBasedExcusalFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule
  ],
  exports: [
    CheckInBasedExcusalFormComponent
  ]
})
export class CheckInBasedExcusalFormModule { }
