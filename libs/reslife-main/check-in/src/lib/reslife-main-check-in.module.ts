import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistComponent } from './checklist/checklist.component';
import { ChecklistItemComponent } from './checklist/checklist-item/checklist-item.component';
import { ReslifeMaterialModule } from '@reslife/shared/ui';
import { CheckInPageComponent } from './check-in-page/check-in-page.component';
import { Route, RouterModule } from '@angular/router';
const checkInRoutes: Route[] = [
  {
    path: 'check-in',
    pathMatch: 'full',
    component: CheckInPageComponent,
    data: {
      pageTitle: 'Check In'
    }
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(checkInRoutes), ReslifeMaterialModule],
  declarations: [
    ChecklistComponent,
    ChecklistItemComponent,
    CheckInPageComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReslifeMainCheckInModule {}
