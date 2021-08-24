import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-schedule-management-page',
  templateUrl: './schedule-management-page.component.html',
  styleUrls: ['./schedule-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleManagementPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
