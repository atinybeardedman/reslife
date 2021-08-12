import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomInspectionStudentDoc } from '@reslife/room-inspection-model';

@Component({
  selector: 'reslife-room-inspection-list-item',
  templateUrl: './room-inspection-list-item.component.html',
  styleUrls: ['./room-inspection-list-item.component.scss']
})
export class RoomInspectionListItemComponent {
  @Input() inspectionDoc!: RoomInspectionStudentDoc | null;
  @Output() inspection = new EventEmitter<RoomInspectionStudentDoc>();

  get inspectedIcon(): {icon: string, color: string} {
    const result = {
      icon: 'thumb_down',
      color: 'warn'
    };

    if(this.inspectionDoc?.result === 'passed' ){
      result.icon = 'thumb_up';
      result.color = 'accent';
    } 
    return result;
  }

  pass(){
    if(this.inspectionDoc){
      this.inspection.emit({
        ...this.inspectionDoc,
        result: 'passed'
      })
    }
  }

  fail(){
    if(this.inspectionDoc){
      this.inspection.emit({
        ...this.inspectionDoc,
        result: 'failed'
      })
    }
  }

  reverse(){
    if(this.inspectionDoc?.result === 'passed'){
      this.fail();
    } else {
      this.pass();
    }
  }
}
