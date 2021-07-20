import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInPageComponent } from './check-in-page.component';
import { CheckInUiModule } from '@reslife/check-ins/check-in-ui';
@NgModule({
    declarations: [CheckInPageComponent],
    imports: [CommonModule, CheckInUiModule],
    exports: [CheckInPageComponent]
  })
  export class CheckInPageModule {}
  