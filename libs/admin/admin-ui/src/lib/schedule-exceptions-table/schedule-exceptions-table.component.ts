import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-schedule-exceptions-table',
  templateUrl: './schedule-exceptions-table.component.html',
  styleUrls: ['./schedule-exceptions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleExceptionsTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
