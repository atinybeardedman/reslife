import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, SimpleChanges, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ScheduleDayException } from '@reslife/admin-model';
import { RecordAction } from '@reslife/shared-models';
import { getDateFromDatestring } from '@reslife/utils';

@Component({
  selector: 'reslife-schedule-exceptions-table',
  templateUrl: './schedule-exceptions-table.component.html',
  styleUrls: ['./schedule-exceptions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleExceptionsTableComponent implements OnChanges, AfterViewInit {
  @Input() exceptions!: ScheduleDayException[] | null;
  @Output() edit = new EventEmitter<RecordAction<ScheduleDayException>>();
  @Output() delete = new EventEmitter<RecordAction<ScheduleDayException>>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  datasource = new MatTableDataSource<ScheduleDayException>([]);
  displayedColumns = ['date', 'note', 'actions'];

  getDate = getDateFromDatestring

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.exceptions && this.exceptions){
      this.datasource.data = this.exceptions;
    }
  }

  ngAfterViewInit(){
    this.datasource.paginator = this.paginator;
  }

}
