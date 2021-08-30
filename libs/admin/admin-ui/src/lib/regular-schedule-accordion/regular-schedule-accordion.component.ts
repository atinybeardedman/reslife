import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DAYNAMES, ScheduleItem } from '@reslife/admin-model';
import { RecordAction } from '@reslife/shared-models';
import { combineDatetime } from '@reslife/utils';

@Component({
  selector: 'reslife-regular-schedule-accordion',
  templateUrl: './regular-schedule-accordion.component.html',
  styleUrls: ['./regular-schedule-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegularScheduleAccordionComponent {
  days = DAYNAMES;
  date = new Date();
  getDate = combineDatetime;
  
  @Input() scheduleItems!: ScheduleItem[] | null;
  @Output() edit = new EventEmitter<RecordAction<ScheduleItem>>();
  @Output() delete = new EventEmitter<RecordAction<ScheduleItem>>();

  getCheckIns(dayNum: number): ScheduleItem[] {
    if(!this.scheduleItems){
      return []
    } 
    return this.scheduleItems.filter(s => s.days.includes(dayNum));
  }
 

}
