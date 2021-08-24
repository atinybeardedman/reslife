import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleManagementPageComponent } from '../schedule-management-page/schedule-management-page.component';
import { AdminUiModule } from '@reslife/admin-ui';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  { path: '', component: ScheduleManagementPageComponent },
];

@NgModule({
  declarations: [ScheduleManagementPageComponent],
  imports: [
    CommonModule,
    AdminUiModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
  ],
})
export class ScheduleManagementFeatureModule {}
