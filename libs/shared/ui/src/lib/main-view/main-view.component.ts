import { Component,ChangeDetectionStrategy, Input, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationItem, Role } from '@reslife/shared-models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'reslife-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainViewComponent implements OnDestroy{
  @Input() title!: string;
  @Input() pageTitle!: string;
  @Input() links: NavigationItem[] = [];
  @Input() role: Role = 'any';
  @ViewChild(MatSidenav, {static: true}) private sidenav!: MatSidenav;
  destroyed = new Subject<void>();
  isMobile$ = new BehaviorSubject<boolean>(false);
  constructor(private breakpointObs: BreakpointObserver){
    this.breakpointObs.observe([
     Breakpoints.HandsetPortrait,
     Breakpoints.TabletPortrait,
     Breakpoints.Small, 
     Breakpoints.XSmall
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
      this.isMobile$.next(result.matches);
    })
  }

  ngOnDestroy(){
    this.destroyed.next();
    this.destroyed.unsubscribe();
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  async handleClick(): Promise<void> {
    if(this.isMobile$.value){
      this.toggleSidenav();
    }
  }
}
