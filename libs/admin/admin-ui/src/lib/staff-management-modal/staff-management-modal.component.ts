import { SimpleChanges } from '@angular/core';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { StaffMember } from '@reslife/admin-model';

@Component({
  selector: 'reslife-staff-management-modal',
  templateUrl: './staff-management-modal.component.html',
  styleUrls: ['./staff-management-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffManagementModalComponent implements OnChanges {
  @Input() title!: string;
  @Input() currentEmails!: string[] | null;
  @Input() staffMember!: StaffMember | null;

  @Output() save = new EventEmitter<StaffMember>();

  editStaffForm: FormGroup;
  constructor(fb: FormBuilder){
    this.editStaffForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, this.isEmailTaken()]],
      isAOD: false,
      isAdmin: false
    })
  }

  isEmailTaken(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.currentEmails){
        if(this.currentEmails.length === 0){
          return null
        } else {
          if (this.currentEmails.includes(control.value)){
            return {
              emailTaken: {value : control.value}
            }
          }
        }
      }
      return null
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.staffMember && this.staffMember){
      this.fillFields();
    }
    if(changes.currentEmails && this.currentEmails){
      this.editStaffForm.controls.email.updateValueAndValidity();
    }
  }

  fillFields(): void {
    const {name, email, isAOD, isAdmin} = this.editStaffForm.controls;
    if(this.staffMember){
      name.setValue(this.staffMember.name);
      email.setValue(this.staffMember.email);
      email.setValidators(null);
      email.disable();
      isAOD.setValue(this.staffMember.roles.includes('aod'))
      isAdmin.setValue(this.staffMember.roles.includes('superadmin'));
    } else {
      this.editStaffForm.reset();
      email.setValidators([Validators.required, this.isEmailTaken()]);
    }
    this.editStaffForm.updateValueAndValidity();
  }

  get editedRecord(): StaffMember {
    const {name, email, isAOD, isAdmin} = this.editStaffForm.controls;
    const staffMember: StaffMember = {
      uid: '',
      name: name.value,
      email: email.value,
      roles: []
    }
    if(isAOD.value){
      staffMember.roles.push('aod');
    }
    if(isAdmin.value){
      staffMember.roles.push('superadmin');
    }
    if(this.staffMember){
      staffMember.uid = this.staffMember.uid;
    }
    return staffMember;
  }

}
