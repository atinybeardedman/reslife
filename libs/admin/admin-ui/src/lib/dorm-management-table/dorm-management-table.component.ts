import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DormDocument, RecordAction } from '@reslife/shared-models';

@Component({
  selector: 'reslife-dorm-management-table',
  templateUrl: './dorm-management-table.component.html',
  styleUrls: ['./dorm-management-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DormManagementTableComponent implements OnChanges {
  @Input() dorms!: DormDocument[] | null;
  @Output() edit = new EventEmitter<RecordAction<DormDocument>>();
  @Output() delete = new EventEmitter<RecordAction<DormDocument>>();
  
  datasource = new MatTableDataSource<DormDocument>([]);
  displayedColumns = ['name', 'isActive', 'actions'];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.dorms && this.dorms){
      this.datasource.data = this.dorms;
    }
  }


}
