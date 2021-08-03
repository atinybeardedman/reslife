import { Component,ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationItem } from '@reslife/shared-models';

@Component({
  selector: 'reslife-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainViewComponent {
  @Input() title!: string;
  @Input() pageTitle!: string;
  @Input() links: NavigationItem[] = [];
  @ViewChild(MatSidenav, {static: true}) private sidenav!: MatSidenav;

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
