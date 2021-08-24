import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-schedule-exception-modal',
  templateUrl: './schedule-exception-modal.component.html',
  styleUrls: ['./schedule-exception-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleExceptionModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
