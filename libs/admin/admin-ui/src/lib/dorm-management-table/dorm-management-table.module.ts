import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DormManagementTableComponent } from './dorm-management-table.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    DormManagementTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    FlexLayoutModule
  ],
  exports: [
    DormManagementTableComponent
  ]
})
export class DormManagementTableModule { }
