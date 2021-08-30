import { Component, OnChanges, ChangeDetectionStrategy, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DormDocument } from '@reslife/shared-models';

@Component({
  selector: 'reslife-dorm-management-modal',
  templateUrl: './dorm-management-modal.component.html',
  styleUrls: ['./dorm-management-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DormManagementModalComponent implements OnChanges {
  @Input() title!: string;
  @Input() dorm!: DormDocument | null;

  @Output() save = new EventEmitter<DormDocument>();
  dormForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.dormForm = fb.group({
      name: ['', Validators.required],
      isActive: false
    })
   }

   ngOnChanges(changes: SimpleChanges): void {
    if(changes.dorm && this.dorm){
      const nameCtrl = this.dormForm.controls.name;
      nameCtrl.setValue(this.dorm.name);
      nameCtrl.disable();
      this.dormForm.controls.isActive.setValue(this.dorm.isActive);
    }
   }


   get dormRecord(): DormDocument {
     const {name, isActive} = this.dormForm.controls;
     const doc: DormDocument = {
       name: name.value,
       isActive: isActive.value,
       uid: ''
     };
     if(this.dorm){
       doc.uid = this.dorm.uid;
     }
     return doc;

   }



 

}
