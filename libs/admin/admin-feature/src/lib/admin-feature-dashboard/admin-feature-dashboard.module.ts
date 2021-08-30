import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFeatureDashboardComponent } from './admin-feature-dashboard.component';
import { SharedUiModule } from '@reslife/shared/ui';



@NgModule({
  declarations: [
    AdminFeatureDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule
  ],
  exports: [
    AdminFeatureDashboardComponent
  ]
})
export class AdminFeatureDashboardModule { }
