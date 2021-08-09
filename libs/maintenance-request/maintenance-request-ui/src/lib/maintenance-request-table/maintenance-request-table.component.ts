import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-maintenance-request-table',
  templateUrl: './maintenance-request-table.component.html',
  styleUrls: ['./maintenance-request-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaintenanceRequestTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
