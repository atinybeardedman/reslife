import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DashboardCard } from '@reslife/shared-models';

@Component({
  selector: 'reslife-aod-feature-dashboard',
  templateUrl: './aod-feature-dashboard.component.html',
  styleUrls: ['./aod-feature-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AodFeatureDashboardComponent {
  cards: DashboardCard[] = [
    {
      title: 'Check In Excusal',
      icon: 'check',
      path: 'check-ins',
      description:
        'Excuse students from check-ins by specific check in or by a time range',
    },
    {
      title: 'Signout Overrides',
      icon: 'person_pin_circle',
      path: 'signouts',
      description:
        'Override student permissions for a one time sign out, or for the entire weekend',
    },
    {
      title: 'Campused Students',
      icon: 'person_off',
      path: 'campused',
      description: 'Manage campused students',
    },
  ];
}
