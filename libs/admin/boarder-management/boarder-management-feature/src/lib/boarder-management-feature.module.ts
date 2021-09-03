import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoarderManagementPageModule } from './boarder-management-page/boarder-management-page.module';
import { BoarderManagementPageComponent } from './boarder-management-page/boarder-management-page.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: BoarderManagementPageComponent }
];
@NgModule({
  imports: [CommonModule, BoarderManagementPageModule, RouterModule.forChild(routes)],
})
export class BoarderManagementFeatureModule {}
