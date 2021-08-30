import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DAYNAMES, ScheduleItem } from '@reslife/admin-model';
import { getAcademicYear } from '@reslife/utils';

@Component({
  selector: 'reslife-regular-schedule-modal',
  templateUrl: './regular-schedule-modal.component.html',
  styleUrls: ['./regular-schedule-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegularScheduleModalComponent implements OnChanges{
  @Input() title!: string;
  @Input() scheduleItem!: ScheduleItem | null;
  @Input() academicYear: string | null = getAcademicYear();

  @Output() save = new EventEmitter<ScheduleItem>();
  scheduleForm: FormGroup;
  daysArray: FormArray;
  dayNames = DAYNAMES;
  constructor(fb: FormBuilder) {
    this.daysArray = fb.array([]);
    for(const _day of DAYNAMES){
      this.daysArray.push(fb.control(false));
    }
    this.scheduleForm = fb.group({
      name: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      days: this.daysArray
    })
   }

   ngOnChanges(changes: SimpleChanges): void {
    if(changes.scheduleItem && this.scheduleItem){
      const nameCtrl = this.scheduleForm.controls.name;
      nameCtrl.setValue(this.scheduleItem.name);
      nameCtrl.disable();

      const {startTime, endTime} = this.scheduleForm.controls;
      startTime.setValue(this.scheduleItem.startTime);
      endTime.setValue(this.scheduleItem.endTime);

      for(const dayNum of this.scheduleItem.days){
        this.daysArray.at(dayNum).setValue(true);
      }
    }
   }

   get isAnyDaySelected(): boolean {
     return this.daysArray.controls.some(c => c.value === true);
   }


   get editedScheduleItem(): ScheduleItem {
     const {name, startTime, endTime} = this.scheduleForm.controls;
     const days = [];
     for(const [index, dayCtrl] of this.daysArray.controls.entries()){
      if(dayCtrl.value === true){
        days.push(index);
      }
     }
     const doc: ScheduleItem = {
       name: name.value,
       startTime: startTime.value,
       endTime: endTime.value,
       days,
       academicYear: this.academicYear as string,
       uid: ''
     };
     if(this.scheduleItem){
       doc.uid = this.scheduleItem.uid;
     }
     return doc;

   }

}
