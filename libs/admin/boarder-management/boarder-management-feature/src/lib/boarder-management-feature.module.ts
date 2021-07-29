import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoarderManagementPageModule } from './boarder-management-page/boarder-management-page.module';
import { BoarderManagementPageComponent } from './boarder-management-page/boarder-management-page.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: BoarderManagementPageComponent}
    ]),
    BoarderManagementPageModule,
  ],
  exports: [BoarderManagementPageModule]
})
export class BoarderManagementFeatureModule {}
