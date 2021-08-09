import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-maintenance-request-modal',
  templateUrl: './maintenance-request-modal.component.html',
  styleUrls: ['./maintenance-request-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaintenanceRequestModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
