import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, OnDestroy, SimpleChanges, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { DormNoteField } from '@reslife/dorm-notes-model';
import { FormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'reslife-dorm-notes-field',
  templateUrl: './dorm-notes-field.component.html',
  styleUrls: ['./dorm-notes-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DormNotesFieldComponent implements OnChanges, AfterViewInit, OnDestroy{
  @Input() field!: DormNoteField | null;
  @Output() updatedField = new EventEmitter<Partial<DormNoteField>>();
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  control = new FormControl('');
  subscription = this.control.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(val => {
    if(this.field && val){
      this.updatedField.emit({
        ...this.field,
        note: val
      });
    }
  });

 ngOnChanges(changes: SimpleChanges):void {
   if(changes.field && changes.field.currentValue?.note !== changes.field.previousValue?.note){
    if(this.field?.isLocked){
      this.control.disable()
    } else {
      this.control.enable();
    }
    this.control.setValue(this.field?.note, {
       emitEvent: false
     });
  }
}

ngAfterViewInit(): void {
   this.autosize?.resizeToFitContent()
 }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
