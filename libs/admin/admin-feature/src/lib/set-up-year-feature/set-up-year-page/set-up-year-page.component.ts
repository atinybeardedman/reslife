import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AcademicYearService } from '@reslife/admin-data-access'
import { AcademicYear, AcademicYearSaveEvent, NamedTimeSpan } from '@reslife/admin-model';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'reslife-set-up-year-page',
  templateUrl: './set-up-year-page.component.html',
  styleUrls: ['./set-up-year-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetUpYearPageComponent implements OnInit {
  years$!: Observable<AcademicYear[]>;
  breaks$!: Observable<NamedTimeSpan[]>;
  selectedYear$ = new ReplaySubject<AcademicYear>(1);
  constructor(private ays: AcademicYearService) { }

  ngOnInit(): void {
    this.years$ = this.ays.getYears();
    this.breaks$ = this.selectedYear$.pipe(
      switchMap(year => this.ays.getBreaks(year.uid))
    );
  }

  async saveYear(saveEvent: AcademicYearSaveEvent): Promise<void>{
    await this.ays.setYear(saveEvent.year);
    await this.ays.setBreaks(saveEvent.year.uid, saveEvent.breaks);
  }

}
