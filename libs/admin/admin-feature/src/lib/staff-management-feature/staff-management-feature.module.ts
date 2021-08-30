import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { StaffManagementPageModule } from './staff-management-page/staff-management-page.module';
import { StaffManagementPageComponent } from './staff-management-page/staff-management-page.component';

const routes: Routes = [
  { path: '', component: StaffManagementPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StaffManagementPageModule
  ]
})
export class StaffManagementFeatureModule { }
