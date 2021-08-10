import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequestModalModule } from './maintenance-request-modal/maintenance-request-modal.module';
import { MaintenanceRequestTableModule } from './maintenance-request-table/maintenance-request-table.module';
import { MaintenanceRequestDetailModalModule } from './maintenance-request-detail-modal/maintenance-request-detail-modal.module';

@NgModule({
  imports: [
    CommonModule,
    MaintenanceRequestModalModule,
    MaintenanceRequestTableModule,
    MaintenanceRequestDetailModalModule,
  ],
  exports: [
    MaintenanceRequestModalModule,
    MaintenanceRequestTableModule,
    MaintenanceRequestDetailModalModule,
  ]
})
export class MaintenanceRequestUiModule {}
