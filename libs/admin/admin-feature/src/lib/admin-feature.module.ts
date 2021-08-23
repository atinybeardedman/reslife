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
