import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequestPageComponent } from './maintenance-request-page.component';
import { MaintenanceRequestUiModule } from '@reslife/maintenance-request-ui'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    MaintenanceRequestPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    FlexLayoutModule,
    MaintenanceRequestUiModule
  ],
  exports: [MaintenanceRequestPageComponent]
})
export class MaintenanceRequestPageModule { }
