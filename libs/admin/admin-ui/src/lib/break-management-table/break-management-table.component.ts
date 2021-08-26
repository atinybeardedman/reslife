import { formatDate } from '@angular/common';
import { Component, OnChanges, ChangeDetectionStrategy, Input, EventEmitter, Output, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NamedTimeSpan } from '@reslife/admin-model';
import { RecordAction } from '@reslife/shared-models';
import { getDateFromDatestring } from '@reslife/utils';

@Component({
  selector: 'reslife-break-management-table',
  templateUrl: './break-management-table.component.html',
  styleUrls: ['./break-management-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreakManagementTableComponent implements OnChanges, AfterViewInit {
  @Input() breaks!: NamedTimeSpan[] | null;

  @Output() edit = new EventEmitter<RecordAction<NamedTimeSpan>>();
  @Output() delete = new EventEmitter<RecordAction<NamedTimeSpan>>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['name', 'range', 'actions'];
  datasource = new MatTableDataSource<NamedTimeSpan>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.breaks && this.breaks){
      this.datasource.data = this.breaks;
    }
  }

  ngAfterViewInit(){
    this.datasource.paginator = this.paginator;
  }


  getRange(breakDoc: NamedTimeSpan): string {
    const start = formatDate(getDateFromDatestring(breakDoc.start), 'M/d', 'en-US');
    const end = formatDate(getDateFromDatestring(breakDoc.end), 'M/d', 'en-US');
    return start + '-' + end;
    
  }
 

}
