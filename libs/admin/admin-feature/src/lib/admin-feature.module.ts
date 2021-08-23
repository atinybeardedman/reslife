import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AdminFeatureDashboardModule } from './admin-feature-dashboard/admin-feature-dashboard.module';
import { AdminFeatureDashboardComponent } from './admin-feature-dashboard/admin-feature-dashboard.component';
import { BoarderManagementFeatureModule, BoarderManagementPageComponent } from '@reslife/boarder-management-feature'
const routes: Route[] = [
  {
    path: '',
    component: AdminFeatureDashboardComponent,
  },

  {
    path: 'manage-boarders',
    pathMatch: 'full',
    component: BoarderManagementPageComponent
  },
  { path: 'dorms', loadChildren: () => import('./dorm-management-feature/dorm-management-feature.module').then(m => m.DormManagementFeatureModule) },
  { path: 'manage-staff', loadChildren: () => import('./staff-management-feature/staff-management-feature.module').then(m => m.StaffManagementFeatureModule) },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AdminFeatureDashboardModule,
    BoarderManagementFeatureModule
  ],  
})
export class AdminFeatureModule {}
