import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-staff-management-table',
  templateUrl: './staff-management-table.component.html',
  styleUrls: ['./staff-management-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffManagementTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
