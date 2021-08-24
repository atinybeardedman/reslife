import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ScheduleDayException } from '@reslife/admin-model';
import { RecordAction } from '@reslife/shared-models';

@Component({
  selector: 'reslife-schedule-exceptions-table',
  templateUrl: './schedule-exceptions-table.component.html',
  styleUrls: ['./schedule-exceptions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleExceptionsTableComponent implements OnChanges {
  @Input() exceptions!: ScheduleDayException[] | null;
  @Output() edit = new EventEmitter<RecordAction<ScheduleDayException>>();
  @Output() delete = new EventEmitter<RecordAction<ScheduleDayException>>();
  
  datasource = new MatTableDataSource<ScheduleDayException>([]);
  displayedColumns = ['date', 'note', 'actions'];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.exceptions && this.exceptions){
      this.datasource.data = this.exceptions;
    }
  }

}
