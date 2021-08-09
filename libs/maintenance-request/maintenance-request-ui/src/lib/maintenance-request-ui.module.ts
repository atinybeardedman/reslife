import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequestModalModule } from './maintenance-request-modal/maintenance-request-modal.module';
import { MaintenanceRequestTableModule } from './maintenance-request-table/maintenance-request-table.module';

@NgModule({
  imports: [CommonModule, MaintenanceRequestModalModule, MaintenanceRequestTableModule],
})
export class MaintenanceRequestUiModule {}
