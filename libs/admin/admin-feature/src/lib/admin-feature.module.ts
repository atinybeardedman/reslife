import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AdminFeatureDashboardModule } from './admin-feature-dashboard/admin-feature-dashboard.module';
import { AdminFeatureDashboardComponent } from './admin-feature-dashboard/admin-feature-dashboard.component';
import { ProcessRequestsFeatureModule } from './process-requests-feature/process-requests-feature.module';
const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminFeatureDashboardComponent,
  },

  {
    path: 'manage-boarders',
    pathMatch: 'full',
   loadChildren: () => 
    import ('@reslife/boarder-management-feature').then(
      m => m.BoarderManagementFeatureModule
    )
  },
  {
    path: 'dorms',
    pathMatch: 'full',
    loadChildren: () =>
      import('./dorm-management-feature/dorm-management-feature.module').then(
        (m) => m.DormManagementFeatureModule
      ),
  },
  {
    path: 'manage-staff',
    pathMatch: 'full',
    loadChildren: () =>
      import('./staff-management-feature/staff-management-feature.module').then(
        (m) => m.StaffManagementFeatureModule
      ),
  },
  {
    path: 'manage-schedule',
    pathMatch: 'full',
    loadChildren: () =>
      import(
        './schedule-management-feature/schedule-management-feature.module'
      ).then((m) => m.ScheduleManagementFeatureModule),
  },
  {
    path: 'set-up-year',
    pathMatch: 'full',
    loadChildren: () => 
      import ('./set-up-year-feature/set-up-year-feature.module')
        .then(m => m.SetUpYearFeatureModule)
  },
  {
    path: 'requests',
    pathMatch: 'full',
    loadChildren: () => 
      import ('./process-requests-feature/process-requests-feature.module')
        .then(m => m.ProcessRequestsFeatureModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AdminFeatureDashboardModule,
  ],
})
export class AdminFeatureModule {}
