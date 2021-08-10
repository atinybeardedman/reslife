import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequestDetailModalComponent } from './maintenance-request-detail-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    MaintenanceRequestDetailModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  exports: [
    MaintenanceRequestDetailModalComponent
  ]
})
export class MaintenanceRequestDetailModalModule { }
