import { Component, ChangeDetectionStrategy, OnChanges, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NamedTimeSpan } from '@reslife/admin-model';
import { getDateFromDatestring, getDateString } from '@reslife/utils';

@Component({
  selector: 'reslife-edit-break-modal',
  templateUrl: './edit-break-modal.component.html',
  styleUrls: ['./edit-break-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditBreakModalComponent implements OnChanges {
  @Input() title!: string | null;
  @Input() breakDoc!: NamedTimeSpan | null;
  
  @Output() save = new EventEmitter<NamedTimeSpan>();
  range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required)
  });
  breakForm = new FormGroup({
    name: new FormControl('', Validators.required),
    range: this.range
  })

  ngOnChanges(changes: SimpleChanges){
    if(changes.breakDoc && this.breakDoc){
      this.fillFields(this.breakDoc);
    }
  }

  fillFields(doc: NamedTimeSpan){
    this.range.controls.start.setValue(getDateFromDatestring(doc.start));
    this.range.controls.end.setValue(getDateFromDatestring(doc.end));
    this.breakForm.controls.name.setValue(doc.name);
  }  

  get editedBreakDoc(): NamedTimeSpan {
    const doc: NamedTimeSpan = {
      name: this.breakForm.controls.name.value,
      start: getDateString(this.range.controls.start.value),
      end: getDateString(this.range.controls.end.value),
      uid: ''
    }
    if(this.breakDoc){
      doc.uid = this.breakDoc.uid;
    }
    return doc;
  }

}
