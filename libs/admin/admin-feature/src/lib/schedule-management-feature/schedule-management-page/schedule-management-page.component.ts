import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ScheduleService } from '@reslife/admin-data-access';
import { ScheduleDayException, ScheduleItem } from '@reslife/admin-model';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'reslife-schedule-management-page',
  templateUrl: './schedule-management-page.component.html',
  styleUrls: ['./schedule-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleManagementPageComponent implements OnInit {
  scheduleItems$!: Observable<ScheduleItem[]>;
  years$!: Observable<string[]>;
  selectedYear$ = new ReplaySubject<string>(1);
  exceptions$!: Observable<ScheduleDayException[]>;
 
  constructor(private ss: ScheduleService) {}

  ngOnInit(): void {
    this.years$ = this.ss.getAcademicYears();
    this.scheduleItems$ = this.selectedYear$.pipe(
      switchMap((year) => this.ss.getScheduleItems(year))
    );
    this.exceptions$ = this.selectedYear$.pipe(
      switchMap(year => this.ss.getExceptionsByYear(year))
    );
    this.ss.getSuggestedYear().then(year => this.selectedYear$.next(year));
  }

}
