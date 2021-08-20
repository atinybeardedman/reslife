import { Component, ChangeDetectionStrategy, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoarderSignoutMeta, StudentSignout } from '@reslife/student-signout-model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'reslife-one-time-signout-form',
  templateUrl: './one-time-signout-form.component.html',
  styleUrls: ['./one-time-signout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneTimeSignoutFormComponent implements OnDestroy{
  @Input() signoutMeta!: BoarderSignoutMeta | null;
  @Output() signout = new EventEmitter<StudentSignout>();
  transportOptions = ['Walk', 'Bike','Car'];
  signoutFields!: FormGroup;
  subscription: Subscription;
  constructor(private fb: FormBuilder) {
    this.signoutFields = this.fb.group({
      destination: ['', Validators.required],
      transport: ['', Validators.required],
      carDetail: [''],
    });
    this.signoutFields.controls.transport.valueChanges.subscribe((val) => {
      const carDetailCtrl = this.signoutFields.controls.carDetail;
      if (val === 'Car') {
        carDetailCtrl.setValidators(Validators.required);
      } else {
        carDetailCtrl.setValidators(null);
      }
      carDetailCtrl.updateValueAndValidity();
    });

    this.subscription = this.signoutFields.valueChanges.subscribe(val => {
      if(this.signoutFields.valid && this.signoutMeta){
        const {destination, transport, carDetail } = this.signoutFields.controls;
        const signout: StudentSignout = {
          student: {
            name: this.signoutMeta.name,
            uid: this.signoutMeta.uid,

          },
          destination: destination.value,
          transport: transport.value,
          timeOut: new Date().toISOString(),
          isCurrentlyOut: true,
          uid: ''
        };
        if(signout.transport === 'Car'){
          signout.transportNote = carDetail.value;
        }
        this.signout.emit(signout);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    
  }

}
