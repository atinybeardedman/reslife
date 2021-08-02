import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageBoardersTableModule } from './manage-boarders-table/manage-boarders-table.module';
import { EditBoarderModalModule } from './edit-boarder-modal/edit-boarder-modal.module';

@NgModule({
  imports: [CommonModule, ManageBoardersTableModule, EditBoarderModalModule],
  exports: [ManageBoardersTableModule, EditBoarderModalModule]
})
export class AdminUiModule {}
