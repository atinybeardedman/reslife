import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequestTableComponent } from './maintenance-request-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    MaintenanceRequestTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [
    MaintenanceRequestTableComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaintenanceRequestTableModule { }
