import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneTimeSignoutFormComponent } from './one-time-signout-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    OneTimeSignoutFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule
  ],
  exports: [
    OneTimeSignoutFormComponent
  ]
})
export class OneTimeSignoutFormModule { }
