import { Component, OnDestroy, ChangeDetectionStrategy, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoarderPermissions } from '@reslife/shared-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'reslife-override-permissions-form',
  templateUrl: './override-permissions-form.component.html',
  styleUrls: ['./override-permissions-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverridePermissionsFormComponent implements OnChanges, OnDestroy {
  @Input() permissions!: BoarderPermissions;
  @Output() permissionsChange = new EventEmitter<BoarderPermissions>();
  permissionsGroup: FormGroup; 
  subscription: Subscription;
  constructor(fb: FormBuilder){
    this.permissionsGroup = fb.group({
      canWalk: [false, Validators.required],
      canBike: [false, Validators.required],
      canCar: [false, Validators.required],
      carRestriction: [''],
    });
    this.subscription = this.permissionsGroup.valueChanges.subscribe(val => {
      if(this.permissionsGroup.dirty && this.permissionsGroup.valid){
        const { canWalk, canBike, canCar, carRestriction } = this.permissionsGroup.controls;
        const permissions: BoarderPermissions = {
          canWalk: canWalk.value as boolean,
          canBike: canBike.value as boolean,
          canCar: canCar.value as boolean,
        };
        if(carRestriction.value){
          permissions.carRestriction = carRestriction.value;
        }
        this.permissionsChange.emit(permissions);
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.permissions && (changes.permissions.currentValue != changes.permissions.previousValue)){
      this.fillFields();
    }
  }

  fillFields(): void {
    this.permissionsGroup.controls.canWalk.setValue(this.permissions.canWalk);
    this.permissionsGroup.controls.canBike.setValue(this.permissions.canBike);
    this.permissionsGroup.controls.canCar.setValue(this.permissions.canCar);
    this.permissionsGroup.controls.carRestriction.setValue(this.permissions.carRestriction || '');
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}
