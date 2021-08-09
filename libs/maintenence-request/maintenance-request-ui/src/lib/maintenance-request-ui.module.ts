import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequestFormModule } from './maintenance-request-form/maintenance-request-form.module';
import { MaintenanceRequestTableModule } from './maintenance-request-table/maintenance-request-table.module';

@NgModule({
  imports: [CommonModule, MaintenanceRequestFormModule, MaintenanceRequestTableModule],
})
export class MaintenanceRequestUiModule {}
