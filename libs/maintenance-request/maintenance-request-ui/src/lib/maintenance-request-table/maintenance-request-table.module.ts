import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequestTableComponent } from './maintenance-request-table.component';



@NgModule({
  declarations: [
    MaintenanceRequestTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaintenanceRequestTableComponent
  ]
})
export class MaintenanceRequestTableModule { }
