import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DormDatePickerEvent } from '@reslife/shared-models';
import { getDateString } from  '@reslife/utils';
@Component({
  selector: 'reslife-dorm-date-picker',
  templateUrl: './dorm-date-picker.component.html',
  styleUrls: ['./dorm-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DormDatePickerComponent {
  @Input() dorms: string[] | null = [];
  @Output() choiceSelected = new EventEmitter<DormDatePickerEvent>();
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
      this.choiceSelected.emit({
        date: getDateString(new Date(date)),
        dorm
      });
    }
    
  }

}
