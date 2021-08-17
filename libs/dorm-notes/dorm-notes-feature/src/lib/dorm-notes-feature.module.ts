import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DormNotesPageModule } from './dorm-notes-page/dorm-notes-page.module';
import { DormNotesPageComponent } from './dorm-notes-page/dorm-notes-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: DormNotesPageComponent}
    ]),
    DormNotesPageModule,
  ],
  exports: [
    DormNotesPageModule
  ]
})
export class DormNotesFeatureModule {}
