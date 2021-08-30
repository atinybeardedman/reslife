import { Component, ChangeDetectionStrategy, OnChanges, AfterViewInit, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CampusedStudentRecord, RecordAction } from '@reslife/shared-models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { getDateFromDatestring } from '@reslife/utils';
@Component({
  selector: 'reslife-campused-management-table',
  templateUrl: './campused-management-table.component.html',
  styleUrls: ['./campused-management-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampusedManagementTableComponent implements OnChanges, AfterViewInit {
  datasource = new MatTableDataSource<CampusedStudentRecord>([]);
  displayedColumns = ['name', 'startDate', 'endDate', 'actions'];
  getDate = getDateFromDatestring;
  @Input() campused!: CampusedStudentRecord[] | null;
  @Output() edit = new EventEmitter<RecordAction<CampusedStudentRecord>>();
  @Output() delete = new EventEmitter<RecordAction<CampusedStudentRecord>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.campused && this.campused){
      this.datasource.data = this.campused;
      this.sort.sort({
        id: 'endDate',
        start: 'asc',
        disableClear: false
    });
    }
  }

  ngAfterViewInit(){
    this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  

}
