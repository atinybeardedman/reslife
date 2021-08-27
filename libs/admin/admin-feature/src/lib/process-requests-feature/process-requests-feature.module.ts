import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProcessRequestsPageComponent } from './process-requests-page/process-requests-page.component';
import { AdminUiModule } from '@reslife/admin-ui';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

const routes: Route[] = [
  {
    path: '',
    component: ProcessRequestsPageComponent,
  },
];

@NgModule({
  declarations: [ProcessRequestsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AdminUiModule,
    MatTabsModule,
    MatCardModule,
    FlexLayoutModule,
  ],
})
export class ProcessRequestsFeatureModule {}
