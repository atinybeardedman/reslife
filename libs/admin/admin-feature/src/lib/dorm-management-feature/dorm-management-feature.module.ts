import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DormManagementPageModule } from './dorm-management-page/dorm-management-page.module';
import { DormManagementPageComponent } from './dorm-management-page/dorm-management-page.component';

const routes: Routes = [{ path: '', component: DormManagementPageComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DormManagementPageModule,
  ],
})
export class DormManagementFeatureModule {}
