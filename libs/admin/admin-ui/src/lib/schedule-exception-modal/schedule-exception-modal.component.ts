import { SimpleChanges } from '@angular/core';
import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {
  CheckInException,
  ScheduleDayException,
  ScheduleItem,
} from '@reslife/admin-model';
import { getDateFromDatestring, getDateString } from '@reslife/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'reslife-schedule-exception-modal',
  templateUrl: './schedule-exception-modal.component.html',
  styleUrls: ['./schedule-exception-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleExceptionModalComponent implements OnChanges {
  @Input() title!: string;
  @Input() exception!: ScheduleDayException | null;
  @Input() regularSchedule!: ScheduleItem[] | null;
  @Input() academicYear!: string | null;
  @Output() save = new EventEmitter<ScheduleDayException>();
  exceptionForm: FormGroup;
  checkInArray: FormArray;
  subscription: Subscription;
  constructor(private fb: FormBuilder) {
    this.checkInArray = fb.array([]);
    this.exceptionForm = fb.group({
      date: ['', Validators.required],
      note: ['', [Validators.required, Validators.maxLength(15)]],
      checkIns: this.checkInArray,
    });
    this.subscription = this.exceptionForm.controls.date.valueChanges.subscribe(
      (val: Date) => {
        if (this.regularSchedule) {
          const dayNum = val.getDay();
          const checkIns = this.regularSchedule
            .filter((s) => s.days.includes(dayNum))
            .map((s) => {
              const exception: CheckInException = {
                'check-in': s.name,
                startTime: s.startTime,
                endTime: s.endTime,
              };
              return exception;
            });
          this.fillCheckIns(checkIns);
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.exception && this.exception) {
      const { date, note } = this.exceptionForm.controls;
      date.setValue(getDateFromDatestring(this.exception.date));
      date.disable();
      note.setValue(this.exception.note);
      this.fillCheckIns(this.exception.checkIns);
    }
  }

  fillCheckIns(checkIns: CheckInException[]): void {
    this.checkInArray.clear();
    for (const checkIn of checkIns) {
      this.checkInArray.push(
        this.fb.group({
          name: [checkIn['check-in'], Validators.required],
          startTime: [checkIn.startTime, Validators.required],
          endTime: [checkIn.endTime, Validators.required],
        })
      );
    }
  }

  addCheckIn(): void {
    this.checkInArray.push(
      this.fb.group({
        name: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
      })
    )
  }

  removeCheckIn(index: number): void {
    this.checkInArray.removeAt(index);
  }

  get isAnyCheckInAdded(): boolean {
    return this.checkInArray.length > 0 && this.checkInArray.valid
  }

  get checkIns(): CheckInException[] {
    return this.checkInArray.controls.map(c => {
      const checkInException: CheckInException = {
        'check-in': c.get('name')?.value,
        startTime:  c.get('startTime')?.value,
        endTime:  c.get('endTime')?.value
      }
      return checkInException;
    })
  }

  get editedException(): ScheduleDayException {
    const { date, note } = this.exceptionForm.controls;
    const exception: ScheduleDayException = {
      uid: '',
      note: note.value,
      date: getDateString(date.value),
      checkIns: this.checkIns,
      academicYear: this.academicYear as string
    };
    if(this.exception){
      exception.uid = this.exception.uid;
    }

    return exception;
  }
}
