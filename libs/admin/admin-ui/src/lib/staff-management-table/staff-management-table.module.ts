import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffManagementTableComponent } from './staff-management-table.component';



@NgModule({
  declarations: [
    StaffManagementTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StaffManagementTableComponent
  ]
})
export class StaffManagementTableModule { }
