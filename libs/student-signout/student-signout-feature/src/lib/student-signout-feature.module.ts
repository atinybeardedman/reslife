import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentSignoutPageModule } from './student-signout-page/student-signout-page.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    StudentSignoutPageModule,
  ],
})
export class StudentSignoutFeatureModule {}
