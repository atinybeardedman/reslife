import { Component } from '@angular/core';
import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import {
  CheckInItem,
  CheckInRecord,
  ExcusedRecord,
} from '@reslife/check-ins/check-in-model';
import {
  getDateString
} from '@reslife/utils';
import { CheckInDataService } from '@reslife/check-ins/check-in-data-access';

@Component({
  selector: 'reslife-check-in-page',
  templateUrl: './check-in-page.component.html',
  styleUrls: ['./check-in-page.component.scss'],
})
export class CheckInPageComponent {
  checkInOpts$!: Observable<string[]>;
  toCheck$!: Observable<CheckInItem[]>;
  checked$!: Observable<CheckInRecord[]>;
  excused$!: Observable<ExcusedRecord[]>;
  selectedDate$: BehaviorSubject<string>;
  selectedCheckIn$: BehaviorSubject<string>;
  untilDestroy$ = new Subject<boolean>();
  constructor(private cs: CheckInDataService) {
    this.selectedDate$ = new BehaviorSubject<string>(getDateString());
    this.selectedCheckIn$ = new BehaviorSubject<string>('');
    this.checkInOpts$ = this.selectedDate$.pipe(
      switchMap((date) => this.cs.getCheckInOpts(date))
    );
    this.selectedDate$.next(getDateString());
    combineLatest([this.selectedDate$, this.selectedCheckIn$])
      .pipe(takeUntil(this.untilDestroy$))
      .subscribe(([date, checkin]) => {
        this.toCheck$ = this.cs.getToCheck(date, checkin);
        this.checked$ = this.cs.getChecked(date, checkin);
        this.excused$ = this.cs.getExcused(date, checkin);
      });
  }

  selectDate(date: string): void {
    this.selectedDate$.next(date);
  }

  selectCheckIn(checkIn: string): void {
    this.selectedCheckIn$.next(checkIn);
  }

  checkIn(item: CheckInItem): void {
    this.cs.checkIn(
      item,
      this.selectedDate$.value,
      this.selectedCheckIn$.value
    );
  }

  unCheckIn(item: CheckInItem): void {
    this.cs.unCheckIn(
      item as CheckInRecord,
      this.selectedDate$.value,
      this.selectedCheckIn$.value
    );
  }

  getInfo(item: CheckInItem): void {
    // show excusal information in modal
  }
}
