import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageBoardersTableModule } from './manage-boarders-table/manage-boarders-table.module';
import { EditBoarderModalModule } from './edit-boarder-modal/edit-boarder-modal.module';
import { ConfirmModalModule } from './confirm-modal/confirm-modal.module';
import { DormManagementTableModule } from './dorm-management-table/dorm-management-table.module';
import { DormManagementModalModule } from './dorm-management-modal/dorm-management-modal.module';

@NgModule({
  imports: [
    CommonModule,
    ManageBoardersTableModule,
    EditBoarderModalModule,
    ConfirmModalModule,
    DormManagementTableModule,
    DormManagementModalModule,
  ],
  exports: [ManageBoardersTableModule, EditBoarderModalModule, ConfirmModalModule],
})
export class AdminUiModule {}
