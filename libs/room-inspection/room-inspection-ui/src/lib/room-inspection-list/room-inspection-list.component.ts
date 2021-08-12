import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-room-inspection-list',
  templateUrl: './room-inspection-list.component.html',
  styleUrls: ['./room-inspection-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomInspectionListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
