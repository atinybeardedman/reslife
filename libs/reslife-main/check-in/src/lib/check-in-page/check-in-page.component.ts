import { Component, OnInit } from '@angular/core';
import {  Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CheckInItem, CheckInRecord, ExcusedRecord, getDateString } from '@reslife/data';
import { CheckInDataService } from '../check-in-data.service';

@Component({
  selector: 'reslife-check-in-page',
  templateUrl: './check-in-page.component.html',
  styleUrls: ['./check-in-page.component.scss']
})
export class CheckInPageComponent implements OnInit {
  checkInOpts$!: Observable<string[]>;
  toCheck$!: Observable<CheckInItem[]>;
  checked$!: Observable<CheckInRecord[]>;
  excused$!: Observable<ExcusedRecord[]>;
  selectedDate$!: BehaviorSubject<string>;
  selectedCheckIn$!: BehaviorSubject<string>;
  untilDestroy$ = new Subject<boolean>();
  constructor(private cs: CheckInDataService) { }

  ngOnInit(): void {
    this.checkInOpts$ = this.selectedDate$.pipe(switchMap(date => this.cs.getCheckInOpts(date)));
    this.selectedDate$.next(getDateString());
    combineLatest([this.selectedDate$, this.selectedCheckIn$])
      .pipe(
        takeUntil(this.untilDestroy$)
      ).subscribe(([date, checkin]) => {
        this.toCheck$ = this.cs.getToCheck(date, checkin);
        this.checked$ = this.cs.getChecked(date, checkin);
        this.excused$ = this.cs.getExcused(date, checkin);
      })
  }

  selectDate(date: Date): void{
    this.selectedDate$.next(date.toISOString().substr(10));
  }

  selectCheckIn(checkIn: string): void{
    this.selectedCheckIn$.next(checkIn);
  }

  checkIn(item: CheckInItem): void {
    this.cs.checkIn(item, this.selectedDate$.value, this.selectedCheckIn$.value);
  }

  unCheckIn(item: CheckInRecord): void {
    this.cs.unCheckIn(item, this.selectedDate$.value, this.selectedCheckIn$.value);
  }

}
