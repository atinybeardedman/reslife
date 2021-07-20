import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageModule } from './welcome-page/welcome-page.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [WelcomePageModule]
})
export class WelcomeFeatureModule {}
