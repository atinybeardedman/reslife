import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, SimpleChanges, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveStayRequest } from '@reslife/admin-model';
import { RecordAction } from '@reslife/shared-models';
import { getDateFromDatestring } from '@reslife/utils';

@Component({
  selector: 'reslife-requests-table',
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsTableComponent implements OnChanges, AfterViewInit {

  datasource = new MatTableDataSource<LeaveStayRequest>([]);
  getDate = getDateFromDatestring
  @Input() requests!: LeaveStayRequest[] | null;
  @Input() showDates = false;
  @Output() view = new EventEmitter<RecordAction<LeaveStayRequest>>();

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['name', 'type', 'timing', 'view'];


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.requests && this.requests){
      this.datasource.data = this.requests;
    }
  }

  ngAfterViewInit(){
    this.datasource.paginator = this.paginator;
  }


}
