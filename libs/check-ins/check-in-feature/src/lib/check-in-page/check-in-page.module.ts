import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInPageComponent } from './check-in-page.component';
import { CheckInUiModule } from '@reslife/check-ins/check-in-ui';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
    declarations: [CheckInPageComponent],
    imports: [CommonModule, CheckInUiModule, MatTabsModule],
    exports: [CheckInPageComponent]
  })
  export class CheckInPageModule {}
  