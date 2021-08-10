import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StudentSignout } from '@reslife/student-signout-model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'reslife-student-signout-table',
  templateUrl: './student-signout-table.component.html',
  styleUrls: ['./student-signout-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentSignoutTableComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  datasource = new MatTableDataSource<StudentSignout>([]);
  @Input() signouts!: StudentSignout[] | null;
  @Output() edit = new EventEmitter<StudentSignout>();
  @Output() signIn = new EventEmitter<StudentSignout>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  baseColumns = ['name', 'timeOut', 'destination', 'transport', 'actions'];
  mobileColumns = ['name', 'timeOut', 'actions'];
  displayedColumns$: Observable<string[]>;
  destroyed = new Subject<void>();
  isMobile$ = new BehaviorSubject<boolean>(false);
  constructor(private breakpointObs: BreakpointObserver) {
    this.breakpointObs
      .observe([
        Breakpoints.HandsetPortrait,
        Breakpoints.TabletPortrait,
        Breakpoints.Small,
        Breakpoints.XSmall,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        this.isMobile$.next(result.matches);
      });
    this.displayedColumns$ = this.isMobile$.pipe(
      map((isMobile) => (isMobile ? this.mobileColumns : this.baseColumns))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.signouts && this.signouts) {
      this.datasource.data = this.signouts;
    }
  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.unsubscribe();
  }
}
