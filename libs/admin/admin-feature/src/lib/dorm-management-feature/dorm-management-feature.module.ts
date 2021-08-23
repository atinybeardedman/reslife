import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DormManagementFeatureComponent } from './dorm-management-feature.component';
import { DormManagementPageModule } from '../dorm-management-page/dorm-management-page.module';


const routes: Routes = [
  { path: '', component: DormManagementFeatureComponent }
];

@NgModule({
  declarations: [
    DormManagementFeatureComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DormManagementPageModule
  ]
})
export class DormManagementFeatureModule { }
