import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DormNotesPickerModule } from './dorm-notes-picker/dorm-notes-picker.module';
import { DormNotesFormModule } from './dorm-notes-form/dorm-notes-form.module';
import { DormNotesFieldModule } from './dorm-notes-field/dorm-notes-field.module';

@NgModule({
  imports: [CommonModule, DormNotesPickerModule, DormNotesFormModule, DormNotesFieldModule],
})
export class DormNotesUiModule {}
