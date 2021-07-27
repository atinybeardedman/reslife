import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoarderManagementPageComponent } from './boarder-management-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ManageBoardersTableComponent } from './manage-boarders-table/manage-boarders-table.component';
@NgModule({
  imports: [CommonModule, MatButtonModule, MatTableModule],
  exports: [
    BoarderManagementPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    BoarderManagementPageComponent,
    ManageBoardersTableComponent
  ],
})
export class BoarderManagementPageModule {}