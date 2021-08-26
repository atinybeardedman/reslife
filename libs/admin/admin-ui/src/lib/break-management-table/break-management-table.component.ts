import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-break-management-table',
  templateUrl: './break-management-table.component.html',
  styleUrls: ['./break-management-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreakManagementTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
