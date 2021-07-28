import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageBoardersTableModule } from './manage-boarders-table/manage-boarders-table.module';

@NgModule({
  imports: [CommonModule, ManageBoardersTableModule],
  exports: [ManageBoardersTableModule]
})
export class AdminUiModule {}
