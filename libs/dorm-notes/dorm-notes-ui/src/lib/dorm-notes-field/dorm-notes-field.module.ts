import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DormNotesFieldComponent } from './dorm-notes-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'


@NgModule({
  declarations: [
    DormNotesFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    DormNotesFieldComponent
  ]
})
export class DormNotesFieldModule { }
