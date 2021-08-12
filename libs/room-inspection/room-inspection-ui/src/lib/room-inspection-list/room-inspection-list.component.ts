import { Component,  ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import {  RoomInspectionStudentDoc } from '@reslife/room-inspection-model';

@Component({
  selector: 'reslife-room-inspection-list',
  templateUrl: './room-inspection-list.component.html',
  styleUrls: ['./room-inspection-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomInspectionListComponent {
  @Input() inspectionDocs!: RoomInspectionStudentDoc[] | null;
  @Input() title: 'To Inspect' | 'Inspected' = 'To Inspect';
  @Output() inspectionResult = new EventEmitter<RoomInspectionStudentDoc>();

}

