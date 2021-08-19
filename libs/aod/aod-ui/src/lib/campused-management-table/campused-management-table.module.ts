import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampusedManagementTableComponent } from './campused-management-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FlexLayoutModule } from "@angular/flex-layout";



@NgModule({
  declarations: [
    CampusedManagementTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule
  ],
  exports: [
    CampusedManagementTableComponent
  ]
})
export class CampusedManagementTableModule { }
