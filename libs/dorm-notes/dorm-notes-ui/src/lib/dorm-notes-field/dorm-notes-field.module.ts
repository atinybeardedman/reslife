import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DormNotesFieldComponent } from './dorm-notes-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatExpansionModule } from '@angular/material/expansion'
import {TextFieldModule} from '@angular/cdk/text-field';


@NgModule({
  declarations: [
    DormNotesFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule
  ],
  exports: [
    DormNotesFieldComponent
  ]
})
export class DormNotesFieldModule { }
