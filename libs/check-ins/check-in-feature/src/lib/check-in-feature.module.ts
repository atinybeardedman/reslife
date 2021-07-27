import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInPageComponent } from './check-in-page/check-in-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckInPageModule } from './check-in-page/check-in-page.module';
import { CheckInDataAccessModule } from '@reslife/check-ins/check-in-data-access';

const routes: Routes = [
  {
    path: '',
    component: CheckInPageComponent
  }
];

@NgModule({
  imports: [CommonModule, CheckInDataAccessModule, RouterModule.forChild(routes)],
  exports: [CheckInPageModule] 
})
export class CheckInFeatureModule {}
