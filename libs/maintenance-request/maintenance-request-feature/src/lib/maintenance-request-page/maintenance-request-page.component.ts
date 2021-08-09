import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-maintenance-request-page',
  templateUrl: './maintenance-request-page.component.html',
  styleUrls: ['./maintenance-request-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaintenanceRequestPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
