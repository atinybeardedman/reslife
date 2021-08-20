import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DashboardCard } from '@reslife/shared-models';

@Component({
  selector: 'reslife-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent  {
  @Input() cards!: DashboardCard[];

}
