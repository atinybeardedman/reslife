import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getDateString } from  '@reslife/utils';
import { RoomInspectionPickerEvent } from '@reslife/room-inspection-model';
@Component({
  selector: 'reslife-room-inspection-picker',
  templateUrl: './room-inspection-picker.component.html',
  styleUrls: ['./room-inspection-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomInspectionPickerComponent {
  @Input() dorms: string[] | null = [];
  @Output() inspectionSelected = new EventEmitter<RoomInspectionPickerEvent>();
  today = new Date();
  pickerForm: FormGroup;
  constructor(fb: FormBuilder){
    this.pickerForm = fb.group({
      date: [this.today, Validators.required],
      dorm: ['', Validators.required]
    });
  }
  
  emitChange(): void {
    const date = this.pickerForm.controls.date.value as Date;
    const dorm = this.pickerForm.controls.dorm.value as string;
    if(date && dorm){
      this.inspectionSelected.emit({
        date: getDateString(new Date(date)),
        dorm
      });
    }
    
  }

}
