import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomInspectionFailModalComponent } from './room-inspection-fail-modal.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RoomInspectionFailModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RoomInspectionFailModalComponent
  ]
})
export class RoomInspectionFailModalModule { }
