import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffManagementModalComponent } from './staff-management-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    StaffManagementModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FlexLayoutModule
  ],
  exports: [
    StaffManagementModalComponent
  ]
})
export class StaffManagementModalModule { }
