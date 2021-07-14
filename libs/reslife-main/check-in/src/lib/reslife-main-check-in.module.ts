import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistComponent } from './checklist/checklist.component';
import { ChecklistItemComponent } from './checklist/checklist-item/checklist-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ChecklistComponent,
    ChecklistItemComponent
  ],
  exports: [
    ChecklistComponent
  ],
})
export class ReslifeMainCheckInModule {}
