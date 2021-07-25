import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { getDateString } from '@reslife/utils';

@Component({
  selector: 'reslife-check-in-choice',
  templateUrl: './check-in-choice.component.html',
  styleUrls: ['./check-in-choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInChoiceComponent {
  @Input() checkIns: string[] | null = [];
  @Input() suggested!: string | null;
  @Output() checkInSelected = new EventEmitter<string>();
  @Output() dateSelected = new EventEmitter<string>();
  today = new Date();

  emitDate(event: MatDatepickerInputEvent<Date | string>): void {
    const date = event.value;
    if (date ) {
      this.dateSelected.emit(getDateString(new Date(date)));
    } 
  }

  emitCheckIn(choice: MatSelectChange): void {
    this.checkInSelected.emit(choice.value);
  }
}
