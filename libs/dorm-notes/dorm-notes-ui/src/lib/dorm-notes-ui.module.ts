import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DormNotesFieldModule } from './dorm-notes-field/dorm-notes-field.module';

@NgModule({
  imports: [CommonModule,  DormNotesFieldModule],
  exports: [DormNotesFieldModule]
})
export class DormNotesUiModule {}
