import { Component, OnDestroy } from '@angular/core';
import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  CheckInDocument,
  CheckInItem,
  CheckInRecord,
  ExcusedRecord,
} from '@reslife/check-ins/check-in-model';
import { getDateString } from '@reslife/utils';
import { CheckInDataService } from '@reslife/check-ins/check-in-data-access';
import { InfoDialogService } from '@reslife/shared/ui';

@Component({
  selector: 'reslife-check-in-page',
  templateUrl: './check-in-page.component.html',
  styleUrls: ['./check-in-page.component.scss'],
})
export class CheckInPageComponent implements OnDestroy{
  checkInDocs$!: Observable<CheckInDocument[]>;
  checkInOpts$!: Observable<string[]>;
  suggestedCheckIn$!: Observable<string>;
  toCheck$!: Observable<CheckInItem[]>;
  checked$!: Observable<CheckInRecord[]>;
  excused$!: Observable<ExcusedRecord[]>;
  selectedDate$: BehaviorSubject<string>;
  selectedCheckIn$: BehaviorSubject<string>;
  untilDestroy$ = new Subject<void>();

  constructor(private cs: CheckInDataService, private ids: InfoDialogService) {
    this.selectedDate$ = new BehaviorSubject<string>(getDateString());
    this.selectedCheckIn$ = new BehaviorSubject<string>('');
    this.checkInDocs$ = this.selectedDate$.pipe(
      switchMap((date) => this.cs.getCheckInDocs(date))
    );
    this.checkInOpts$ = this.checkInDocs$.pipe(
      map((choices) => choices.map((c) => c['check-in']))
    );
    this.suggestedCheckIn$ = this.checkInDocs$.pipe(
      map((choices) => this.cs.getSuggestedCheckIn(choices)),
      tap(choice => {
        if(choice){
          this.selectedCheckIn$.next(choice)
        }
      })
    );
    this.selectedDate$.next(getDateString());
    combineLatest([this.selectedDate$, this.selectedCheckIn$])
      .pipe(takeUntil(this.untilDestroy$))
      .subscribe(([date, checkin]) => {
        this.cs.setCheckIn(date, checkin);
        this.toCheck$ = this.cs.getToCheck();
        this.checked$ = this.cs.getChecked();
        this.excused$ = this.cs.getExcused();
      });
  }

  ngOnDestroy(){
    this.untilDestroy$.next();
    this.untilDestroy$.unsubscribe();
    this.cs.unSetCheckIn();
  }

  selectDate(date: string): void {
    this.selectedDate$.next(date);
  }

  selectCheckIn(checkIn: string): void {
    this.selectedCheckIn$.next(checkIn);
  }

  checkIn(item: CheckInItem): void {
    this.cs.checkIn(item);
  }

  unCheckIn(item: CheckInItem): void {
    this.cs.unCheckIn(item as CheckInRecord);
  }

  getInfo(item: CheckInItem): void {
    const record = item as ExcusedRecord;
    this.ids.open(record.note);
  }
}
