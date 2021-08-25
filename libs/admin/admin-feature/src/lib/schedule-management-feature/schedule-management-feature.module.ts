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
import { RegularScheduleTabComponent } from '../schedule-management-page/regular-schedule-tab/regular-schedule-tab.component';
import { ExceptionsScheduleTabComponent } from '../schedule-management-page/exceptions-schedule-tab/exceptions-schedule-tab.component';

const routes: Routes = [
  { path: '', component: ScheduleManagementPageComponent },
];

@NgModule({
  declarations: [
    ScheduleManagementPageComponent,
    RegularScheduleTabComponent,
    ExceptionsScheduleTabComponent,
  ],
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
