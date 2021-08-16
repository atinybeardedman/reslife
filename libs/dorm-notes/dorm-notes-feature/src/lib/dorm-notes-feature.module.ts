import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DormNotesPageModule } from './dorm-notes-page/dorm-notes-page.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    DormNotesPageModule,
  ],
})
export class DormNotesFeatureModule {}
