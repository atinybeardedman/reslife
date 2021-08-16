import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DormNotesFormModule } from './dorm-notes-form/dorm-notes-form.module';
import { DormNotesFieldModule } from './dorm-notes-field/dorm-notes-field.module';

@NgModule({
  imports: [CommonModule, DormNotesFormModule, DormNotesFieldModule],
})
export class DormNotesUiModule {}
