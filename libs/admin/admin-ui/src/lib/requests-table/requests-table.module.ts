import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsTableComponent } from './requests-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    RequestsTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  exports: [
    RequestsTableComponent
  ]
})
export class RequestsTableModule { }
