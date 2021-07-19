import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistComponent } from './checklist/checklist.component';
import { ChecklistItemComponent } from './checklist/checklist-item/checklist-item.component';
import { ReslifeMaterialModule } from '@reslife/shared/ui';
import { CheckInPageComponent } from './check-in-page/check-in-page.component';
import { Route, RouterModule } from '@angular/router';
import { CheckInChoiceComponent } from './check-in-choice/check-in-choice.component';
const checkInRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: CheckInPageComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(checkInRoutes), ReslifeMaterialModule],
  declarations: [
    ChecklistComponent,
    ChecklistItemComponent,
    CheckInPageComponent,
    CheckInChoiceComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReslifeMainCheckInModule {}
