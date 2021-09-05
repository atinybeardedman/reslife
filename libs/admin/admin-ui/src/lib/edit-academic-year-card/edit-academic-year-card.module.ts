import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditAcademicYearCardComponent } from './edit-academic-year-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BreakManagementTableModule } from './break-management-table/break-management-table.module';
import { EditBreakModalModule } from './edit-break-modal/edit-break-modal.module';
import { ConfirmModalModule } from '../confirm-modal/confirm-modal.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    EditAcademicYearCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    BreakManagementTableModule,
    EditBreakModalModule,
    ConfirmModalModule,
  ],
  exports: [
    EditAcademicYearCardComponent
  ]
})
export class EditAcademicYearCardModule { }
