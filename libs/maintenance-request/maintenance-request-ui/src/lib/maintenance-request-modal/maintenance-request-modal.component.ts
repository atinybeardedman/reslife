import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaintenanceRequest } from '@reslife/maintenance-request-model';
import { getDateString } from '@reslife/utils';
@Component({
  selector: 'reslife-maintenance-request-modal',
  templateUrl: './maintenance-request-modal.component.html',
  styleUrls: ['./maintenance-request-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaintenanceRequestModalComponent {
  @Input() dorms!: string[] | null;
  @Output() saveRequest = new EventEmitter<MaintenanceRequest>();
  requestForm: FormGroup;
  constructor(fb: FormBuilder) { 
    this.requestForm = fb.group({
      subject: ['', Validators.required],
      building: ['', Validators.required],
      otherBuilding: [''],
      room: [''],
      detail: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.requestForm.controls.building.valueChanges.subscribe(val => {
      const otherBuildingCtrl = this.requestForm.controls.otherBuilding;
      if(val === 'Other') {
        otherBuildingCtrl.setValidators(Validators.required);
      } else {
        otherBuildingCtrl.setValidators(null);
      }
      otherBuildingCtrl.updateValueAndValidity();
    })
  }

  get newRequest(): MaintenanceRequest {
    const request: MaintenanceRequest = {
      subject: this.requestForm.controls.subject.value,
      building: this.requestForm.controls.building.value,
      room: this.requestForm.controls.room.value,
      request: this.requestForm.controls.detail.value,
      date: getDateString()
    };
    if(request.building === 'Other'){
      request.building = this.requestForm.controls.otherBuilding.value;
    }
    if(request.room === ''){
      delete request.room;
    }
    return request;

  }



}
