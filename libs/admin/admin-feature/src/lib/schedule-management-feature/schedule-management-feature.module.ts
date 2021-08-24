import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleManagementPageComponent } from '../schedule-management-page/schedule-management-page.component';


const routes: Routes = [
  { path: '', component: ScheduleManagementPageComponent}
];

@NgModule({
  declarations: [
    ScheduleManagementPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ScheduleManagementFeatureModule { }
