import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageBoardersTableModule } from './manage-boarders-table/manage-boarders-table.module';
import { EditBoarderModalModule } from './edit-boarder-modal/edit-boarder-modal.module';
import { ConfirmModalModule } from './confirm-modal/confirm-modal.module';

@NgModule({
  imports: [
    CommonModule,
    ManageBoardersTableModule,
    EditBoarderModalModule,
    ConfirmModalModule,
  ],
  exports: [ManageBoardersTableModule, EditBoarderModalModule, ConfirmModalModule],
})
export class AdminUiModule {}
