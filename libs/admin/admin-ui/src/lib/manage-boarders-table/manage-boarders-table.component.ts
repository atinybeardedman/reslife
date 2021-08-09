import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Boarder } from '@reslife/shared-models';
import { BoarderAction } from '@reslife/admin-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { getDateFromDatestring } from '@reslife/utils';


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
  @Output() edit = new EventEmitter<BoarderAction>();
  @Output() delete = new EventEmitter<BoarderAction>();
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
  }

 

}
