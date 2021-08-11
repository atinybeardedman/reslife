import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NamedItem } from '@reslife/shared-models';
import {
  BoarderSignoutMeta,
  StudentSignout,
  TransportMethod,
} from '@reslife/student-signout-model';
@Component({
  selector: 'reslife-student-signout-modal',
  templateUrl: './student-signout-modal.component.html',
  styleUrls: ['./student-signout-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentSignoutModalComponent implements OnChanges {
  @Input() signout!: StudentSignout | null;
  @Input() boarders!: BoarderSignoutMeta[] | null;
  @Input() signoutMeta!: BoarderSignoutMeta | null;
  selectedBoarder!: BoarderSignoutMeta | null;
  signoutFields!: FormGroup;
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.signoutMeta && this.signoutMeta && this.signout) {
      this.fillFields(this.signout);
    }
  }

  selectBoarder(boarderMeta: NamedItem) {
    this.selectedBoarder = boarderMeta as BoarderSignoutMeta;
  }

  fillFields(signout: StudentSignout): void {
    this.selectedBoarder = this.signoutMeta;
    this.signoutFields.controls.destination.setValue(signout.destination);
    this.signoutFields.controls.transport.setValue(signout.transport);
    if (signout.transport === 'Car') {
      this.signoutFields.controls.carDetail.setValue(signout.transportNote);
    }
  }

  get transportOptions(): string[] {
    const options: TransportMethod[] = [];
    if (this.selectedBoarder) {
      if (this.selectedBoarder.permissions.canWalk) {
        options.push('Walk');
      }
      if (this.selectedBoarder.permissions.canBike) {
        options.push('Bike');
      }
      if (this.selectedBoarder.permissions.canCar) {
        options.push('Car');
      }
    }
    return options;
  }

  get editedSignout(): StudentSignout {
    let signout: StudentSignout;
    if (this.signout) {
      signout = {
        ...this.signout,
        destination: this.signoutFields.controls.destination.value,
        transport: this.signoutFields.controls.transport.value,
      };
    } else {
      let student;
      if (this.selectedBoarder) {
        student = {
          name: this.selectedBoarder.name,
          uid: this.selectedBoarder.uid,
        };
      } else {
        student = {
          name: '',
          uid: '',
        };
      }
      signout = {
        student,
        destination: this.signoutFields.controls.destination.value,
        transport: this.signoutFields.controls.transport.value,
        timeOut: new Date().toISOString(),
        isCurrentlyOut: true,
        uid: '',
      };
    }
    if (signout.transport === 'Car') {
      signout.transportNote = this.signoutFields.controls.carDetail.value;
    } else {
      delete signout.transportNote;
    }
    return signout;
  }
}
