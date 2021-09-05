import { formatDate } from '@angular/common';
import { Component,  ChangeDetectionStrategy, AfterViewInit, EventEmitter, Input, OnChanges, Output, ViewChild, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NamedTimeSpan } from '@reslife/admin-model';
import { TimeExcusalDoc } from '@reslife/aod-model';
import { RecordAction } from '@reslife/shared-models';
import { getDateFromDatestring } from '@reslife/utils';
@Component({
  selector: 'reslife-time-based-excusal-table',
  templateUrl: './time-based-excusal-table.component.html',
  styleUrls: ['./time-based-excusal-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeBasedExcusalTableComponent implements OnChanges, AfterViewInit {
  @Input() excusals!: TimeExcusalDoc[] | null;

  @Output() delete = new EventEmitter<RecordAction<TimeExcusalDoc>>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['name', 'range', 'actions'];
  datasource = new MatTableDataSource<TimeExcusalDoc>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.excusals && this.excusals){
      this.datasource.data = this.excusals;
    }
  }

  ngAfterViewInit(){
    this.datasource.paginator = this.paginator;
  }


  getRange(excusal: TimeExcusalDoc): string {
    const start = formatDate(getDateFromDatestring(excusal.leaveDate), 'M/d HH:mm', 'en-US');
    const end = formatDate(getDateFromDatestring(excusal.returnDate), 'M/d HH:mm', 'en-US');
    return start + ' - ' + end;
    
  }

}
