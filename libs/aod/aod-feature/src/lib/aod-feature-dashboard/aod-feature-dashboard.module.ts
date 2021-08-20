import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AodFeatureDashboardComponent } from './aod-feature-dashboard.component';
import { SharedUiModule } from '@reslife/shared/ui';



@NgModule({
  declarations: [
    AodFeatureDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule
  ],
  exports: [
    AodFeatureDashboardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AodFeatureDashboardModule { }
