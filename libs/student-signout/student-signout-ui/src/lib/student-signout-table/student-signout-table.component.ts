import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StudentSignout } from '@reslife/student-signout/student-signout-model';
@Component({
  selector: 'reslife-student-signout-table',
  templateUrl: './student-signout-table.component.html',
  styleUrls: ['./student-signout-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentSignoutTableComponent implements OnChanges, AfterViewInit {
  datasource = new MatTableDataSource<StudentSignout>([]);
  @Input() signouts!: StudentSignout[] | null;
  @Output() edit = new EventEmitter<StudentSignout>();
  @Output() signIn = new EventEmitter<StudentSignout>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['name', 'timeOut', 'destination', 'transport', 'actions'];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.signouts && this.signouts){
      this.datasource.data = this.signouts;
    }
  }

  ngAfterViewInit(){
    this.datasource.paginator = this.paginator;
  }

}
