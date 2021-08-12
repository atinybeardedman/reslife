import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoomInspectionPageModule } from './room-inspection-page/room-inspection-page.module';
import { RoomInspectionPageComponent } from './room-inspection-page/room-inspection-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
     {path: '', pathMatch: 'full', component: RoomInspectionPageComponent} 
    ]),
    RoomInspectionPageModule,
  ],
})
export class RoomInspectionFeatureModule {}
