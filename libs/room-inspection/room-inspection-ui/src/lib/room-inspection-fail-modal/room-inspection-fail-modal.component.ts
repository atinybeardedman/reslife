import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-room-inspection-fail-modal',
  templateUrl: './room-inspection-fail-modal.component.html',
  styleUrls: ['./room-inspection-fail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomInspectionFailModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
