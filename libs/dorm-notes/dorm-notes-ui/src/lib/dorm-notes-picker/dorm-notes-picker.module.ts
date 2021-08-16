import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DormNotesPickerComponent } from './dorm-notes-picker.component';



@NgModule({
  declarations: [
    DormNotesPickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DormNotesPickerComponent
  ]
})
export class DormNotesPickerModule { }
