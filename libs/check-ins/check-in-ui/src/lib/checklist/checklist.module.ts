import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistComponent } from './checklist.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChecklistItemComponent } from './checklist-item/checklist-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedUiModule } from '@reslife/shared/ui'

@NgModule({
  declarations: [ChecklistComponent, ChecklistItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    FlexLayoutModule,
    SharedUiModule
  ],
  exports: [ChecklistComponent],
})
export class CheckListModule {}
