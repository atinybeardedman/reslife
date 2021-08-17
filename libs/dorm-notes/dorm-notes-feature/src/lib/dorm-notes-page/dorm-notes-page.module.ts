import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DormNotesPageComponent } from './dorm-notes-page.component';
import { SharedUiModule } from '@reslife/shared/ui';
import { DormNotesUiModule } from '@reslife/dorm-notes-ui';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [DormNotesPageComponent],
  imports: [CommonModule, SharedUiModule, DormNotesUiModule, MatCardModule, FlexLayoutModule],
  exports: [DormNotesPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DormNotesPageModule {}
