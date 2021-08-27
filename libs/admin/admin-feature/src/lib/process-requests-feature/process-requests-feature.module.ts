import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProcessRequestsPageComponent } from './process-requests-page/process-requests-page.component';

const routes: Route[] = [
  {
    path: '',
    component: ProcessRequestsPageComponent,
  },
];

@NgModule({
  declarations: [ProcessRequestsPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProcessRequestsFeatureModule {}
