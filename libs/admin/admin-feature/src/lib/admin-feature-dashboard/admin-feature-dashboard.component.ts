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
    // {
    //   title: 'Campused Students',
    //   icon: 'person_off',
    //   path: 'campused',
    //   description: 'Manage campused students',
    // },
  ];
}
