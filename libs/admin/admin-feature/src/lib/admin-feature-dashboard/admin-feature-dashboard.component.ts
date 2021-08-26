import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DashboardCard } from '@reslife/shared-models';

@Component({
  selector: 'reslife-admin-feature-dashboard',
  templateUrl: './admin-feature-dashboard.component.html',
  styleUrls: ['./admin-feature-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFeatureDashboardComponent {
  cards: DashboardCard[] = [
    {
      title: 'Manage Boarders',
      icon: 'manage_accounts',
      path: 'manage-boarders',
      description:
        'Add, edit, or remove boarders',
    },
    {
      title: 'Manage Dorms',
      icon: 'hotel',
      path: 'dorms',
      description:
        'Manage which dorms are active'
    },
    {
      title: 'Manage Staff',
      icon: 'supervisor_account',
      path: 'manage-staff',
      description:
        'Manage staff and edit their access to admin and aod features'
    },
    {
      title: 'Manage Schedule',
      icon: 'event_available',
      path: 'manage-schedule',
      description:
        'Manage the regular check in schedule and also add/remove exceptions'
    },
    {
      title: 'Year Set Up',
      icon: 'event_available',
      path: 'set-up-year',
      description:
        'Set up or edit an academic year by defining the start and end dates as well as breaks.'
    },
  ];
}
