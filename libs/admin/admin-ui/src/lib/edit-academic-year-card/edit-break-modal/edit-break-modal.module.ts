import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBreakModalComponent } from './edit-break-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditBreakModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule, 
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EditBreakModalComponent
  ]
})
export class EditBreakModalModule { }
