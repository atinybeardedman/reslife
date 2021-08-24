import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegularScheduleAccordionComponent } from './regular-schedule-accordion.component';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    RegularScheduleAccordionComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  exports: [
    RegularScheduleAccordionComponent
  ]
})
export class RegularScheduleAccordionModule { }
