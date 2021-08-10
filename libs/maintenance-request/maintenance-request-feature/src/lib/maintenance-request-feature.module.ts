import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaintenanceRequestPageModule } from './maintenance-request-page/maintenance-request-page.module';
import { MaintenanceRequestPageComponent } from './maintenance-request-page/maintenance-request-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
     {path: '', pathMatch: 'full', component: MaintenanceRequestPageComponent} 
    ]),
    MaintenanceRequestPageModule,
  ],
  exports: [MaintenanceRequestPageModule]
})
export class MaintenanceRequestFeatureModule {}
