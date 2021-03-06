import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Boarder, RecordAction } from '@reslife/shared-models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { getDateFromDatestring } from '@reslife/utils';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'reslife-manage-boarders-table',
  templateUrl: './manage-boarders-table.component.html',
  styleUrls: ['./manage-boarders-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageBoardersTableComponent implements OnChanges, AfterViewInit {
  datasource = new MatTableDataSource<Boarder>([]);
  getDate = getDateFromDatestring
  @Input() boarders!: Boarder[] | null;
  @Input() showDates = false;
  @Output() edit = new EventEmitter<RecordAction<Boarder>>();
  @Output() delete = new EventEmitter<RecordAction<Boarder>>();
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  get displayedColumns(): string[] {
    
  const baseColumns = ['name', 'type', 'actions'];
  const dateColumns = ['name', 'startDate', 'endDate', 'actions'];
  return this.showDates ? dateColumns : baseColumns;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.boarders && this.boarders){
      this.datasource.data = this.boarders;
    }
  }

  ngAfterViewInit(){
    this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      if(this.showDates){
        this.sort.sort({
          id: 'startDate',
          start: 'asc',
          disableClear: false
        })
      }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }


 

}
