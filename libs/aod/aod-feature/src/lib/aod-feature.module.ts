import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AodCheckInPageModule } from './aod-check-in-page/aod-check-in-page.module';
import { AodSignoutsPageModule } from './aod-signouts-page/aod-signouts-page.module';
import { AodCheckInPageComponent } from './aod-check-in-page/aod-check-in-page.component';
import { AodSignoutsPageComponent } from './aod-signouts-page/aod-signouts-page.component';
import { AodFeatureDashboardModule } from './aod-feature-dashboard/aod-feature-dashboard.module';
import { AodFeatureDashboardComponent } from './aod-feature-dashboard/aod-feature-dashboard.component';

const routes: Route[] = [
  {
    path: '',
    component: AodFeatureDashboardComponent,
  },
  {
    path: 'check-ins',
    pathMatch: 'full',
    component: AodCheckInPageComponent,
  },
  { path: 'signouts', pathMatch: 'full', component: AodSignoutsPageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AodCheckInPageModule,
    AodSignoutsPageModule,
    AodFeatureDashboardModule,
  ],
})
export class AodFeatureModule {}
