import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AdminFeatureDashboardModule } from './admin-feature-dashboard/admin-feature-dashboard.module';
import { AdminFeatureDashboardComponent } from './admin-feature-dashboard/admin-feature-dashboard.component';
import {
  BoarderManagementFeatureModule,
  BoarderManagementPageComponent,
} from '@reslife/boarder-management-feature';
import { SetUpYearFeatureModule } from './set-up-year-feature/set-up-year-feature.module';
const routes: Route[] = [
  {
    path: '',
    component: AdminFeatureDashboardComponent,
  },

  {
    path: 'manage-boarders',
    pathMatch: 'full',
    component: BoarderManagementPageComponent,
  },
  {
    path: 'dorms',
    loadChildren: () =>
      import('./dorm-management-feature/dorm-management-feature.module').then(
        (m) => m.DormManagementFeatureModule
      ),
  },
  {
    path: 'manage-staff',
    loadChildren: () =>
      import('./staff-management-feature/staff-management-feature.module').then(
        (m) => m.StaffManagementFeatureModule
      ),
  },
  {
    path: 'manage-schedule',
    loadChildren: () =>
      import(
        './schedule-management-feature/schedule-management-feature.module'
      ).then((m) => m.ScheduleManagementFeatureModule),
  },
  {
    path: 'set-up-year',
    loadChildren: () => 
      import ('./set-up-year-feature/set-up-year-feature.module')
        .then(m => m.SetUpYearFeatureModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AdminFeatureDashboardModule,
    BoarderManagementFeatureModule,
    SetUpYearFeatureModule,
  ],
})
export class AdminFeatureModule {}
