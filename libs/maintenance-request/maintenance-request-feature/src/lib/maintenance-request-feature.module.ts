import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaintenanceRequestPageModule } from './maintenance-request-page/maintenance-request-page.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    MaintenanceRequestPageModule,
  ],
})
export class MaintenanceRequestFeatureModule {}
