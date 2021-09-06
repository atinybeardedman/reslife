import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcademicYear } from '@reslife/admin-model';
import { Boarder, BoarderType } from '@reslife/shared-models';
import { getDateString, getDateFromDatestring, getYearEndDateString } from '@reslife/utils';

@Component({
  selector: 'reslife-edit-boarder-modal',
  templateUrl: './edit-boarder-modal.component.html',
  styleUrls: ['./edit-boarder-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBoarderModalComponent implements OnChanges {
  @Input() boarder!: Boarder | null;
  @Input() dorms!: string[] | null;
  @Input() boarderTypes: BoarderType[] = ['5 Day', '7 Day'];
  @Input() title = 'New Boarder';
  @Input() academicYear!: AcademicYear | null;
  @Output() save = new EventEmitter<Boarder>();

  today = new Date();
  endDate = getDateFromDatestring(getYearEndDateString());
  bioStepGroup!: FormGroup;
  permissionsStepGroup!: FormGroup;
  bioFields = ['firstName', 'lastName', 'email', 'dorm', 'type', 'startDate'];
  permissionFields = ['canWalk', 'canRide', 'canCar', 'carRestriction'];
  constructor(private fb: FormBuilder) {
    this.bioStepGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dorm: ['', Validators.required],
      type: ['7 Day', Validators.required],
      startDate: [this.today, Validators.required],
      endDate: [this.endDate, Validators.required]
    });
    this.permissionsStepGroup = this.fb.group({
      canWalk: [false, Validators.required],
      canBike: [false, Validators.required],
      canCar: [false, Validators.required],
      carRestriction: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.boarder && this.boarder) {
      this.fillFields(this.boarder);
    } else if(changes.academicYear && this.academicYear && !this.boarder){
      // this is getting called 2x for some inputs, so the else isn't providing the exclusion needed
      if(changes.academicYear.previousValue != changes.academicYear.currentValue){
        this.bioStepGroup.controls.startDate.setValue(getDateFromDatestring(this.academicYear.start));
        this.bioStepGroup.controls.endDate.setValue(getDateFromDatestring(this.academicYear.end));
      }
    }
  }

  fillFields(boarder: Boarder): void {
    if(boarder){
      this.bioStepGroup.controls.firstName.setValue(boarder.firstName);
      this.bioStepGroup.controls.lastName.setValue(boarder.lastName);
      this.bioStepGroup.controls.email.setValue(boarder.email.replace('@oakwoodfriends.org', ''));
      this.bioStepGroup.controls.dorm.setValue(boarder.dorm);
      this.bioStepGroup.controls.type.setValue(boarder.type);
      this.bioStepGroup.controls.startDate.setValue(getDateFromDatestring(boarder.startDate));
      this.bioStepGroup.controls.endDate.setValue(getDateFromDatestring(boarder.endDate))

      this.permissionsStepGroup.controls.canWalk.setValue(boarder.permissions.canWalk);
      this.permissionsStepGroup.controls.canBike.setValue(boarder.permissions.canBike);
      this.permissionsStepGroup.controls.canCar.setValue(boarder.permissions.canCar);
      this.permissionsStepGroup.controls.carRestriction.setValue(boarder.permissions.carRestriction || '');
    }
  }

  get editedBoarder(): Boarder {
    const {firstName, lastName, email, dorm, type, startDate, endDate } = this.bioStepGroup.controls;
    const { canWalk, canBike, canCar, carRestriction } = this.permissionsStepGroup.controls;
    const boarder: Boarder = {
      firstName: firstName.value as string,
      lastName: lastName.value as string,
      name: firstName.value + ' ' + lastName.value,
      email: email.value + '@oakwoodfriends.org',
      dorm: dorm.value as string,
      type: type.value as BoarderType,
      startDate: getDateString(startDate.value),
      endDate: getDateString(endDate.value),
      permissions: {
        canWalk: canWalk.value as boolean,
        canBike: canBike.value as boolean,
        canCar: canCar.value as boolean,
      },
      isActive: false,
      uid: this.boarder?.uid || ''
    };
    if(carRestriction.value){
      boarder.permissions.carRestriction = carRestriction.value;
    }
    return boarder;
  }
}
