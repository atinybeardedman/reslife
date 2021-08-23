import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoarderManagementPageModule } from './boarder-management-page/boarder-management-page.module';
@NgModule({
  imports: [
    CommonModule,
    BoarderManagementPageModule,
  ],
  exports: [BoarderManagementPageModule]
})
export class BoarderManagementFeatureModule {}
