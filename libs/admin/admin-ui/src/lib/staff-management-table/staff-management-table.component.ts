import { Component, OnChanges, ChangeDetectionStrategy, EventEmitter, Input, Output, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { RecordAction } from '@reslife/shared-models';
import { StaffMember } from '@reslife/admin-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'reslife-staff-management-table',
  templateUrl: './staff-management-table.component.html',
  styleUrls: ['./staff-management-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffManagementTableComponent implements OnChanges, AfterViewInit {
  @Input() staff!: StaffMember[] | null;
  @Output() edit = new EventEmitter<RecordAction<StaffMember>>();
  @Output() delete = new EventEmitter<RecordAction<StaffMember>>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  datasource = new MatTableDataSource<StaffMember>([]);
  displayedColumns = ['name', 'roles', 'actions'];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.staff && this.staff){
      this.datasource.data = this.staff;
    }
  }

  ngAfterViewInit(){
    this.datasource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }



}
