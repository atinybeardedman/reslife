import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomInspectionListComponent } from './room-inspection-list.component';
import { RoomInspectionListItemComponent } from './room-inspection-list-item/room-inspection-list-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    RoomInspectionListComponent,
    RoomInspectionListItemComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    FlexLayoutModule,
  ],
  exports: [
    RoomInspectionListComponent
  ]
})
export class RoomInspectionListModule { }
