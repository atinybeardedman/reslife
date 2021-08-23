import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffManagementPageComponent } from './staff-management-page.component';



@NgModule({
  declarations: [
    StaffManagementPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StaffManagementPageComponent
  ]
})
export class StaffManagementPageModule { }
