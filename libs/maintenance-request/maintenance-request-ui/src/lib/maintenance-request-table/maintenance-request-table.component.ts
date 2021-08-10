import {
  Component,
  OnChanges,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { MaintenanceRequestDoc } from '@reslife/maintenance-request-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'reslife-maintenance-request-table',
  templateUrl: './maintenance-request-table.component.html',
  styleUrls: ['./maintenance-request-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaintenanceRequestTableComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() requests!: MaintenanceRequestDoc[];
  @Output() showDetail = new EventEmitter<MaintenanceRequestDoc>();
  datasource = new MatTableDataSource<MaintenanceRequestDoc>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  baseColumns = ['subject', 'building', 'date', 'detail'];
  mobileColumns = ['subject', 'date', 'detail'];
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
    if (changes.requests && this.requests) {
      this.datasource.data = this.requests;
    }
  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
    if(this.datasource.data.length > 0){
      this.sort.sort({
        id: 'date',
        start: 'desc',
        disableClear: false,
      });
    }
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.unsubscribe();
  }
}
