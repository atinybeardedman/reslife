import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentSignoutPageModule } from './student-signout-page/student-signout-page.module';
import { StudentSignoutPageComponent } from './student-signout-page/student-signout-page.component';

@NgModule({
  imports: [
    CommonModule,
    StudentSignoutPageModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: StudentSignoutPageComponent}
    ]),
  ],
  exports: [StudentSignoutPageModule]
})
export class StudentSignoutFeatureModule {}
