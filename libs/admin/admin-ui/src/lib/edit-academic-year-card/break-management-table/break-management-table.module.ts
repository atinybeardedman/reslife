import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakManagementTableComponent } from './break-management-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    BreakManagementTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  exports: [
    BreakManagementTableComponent,
  ]
})
export class BreakManagementTableModule { }
