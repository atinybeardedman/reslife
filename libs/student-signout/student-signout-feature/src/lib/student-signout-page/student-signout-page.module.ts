import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentSignoutPageComponent } from './student-signout-page.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StudentSignoutUiModule } from '@reslife/student-signout/student-signout-ui';

@NgModule({
  declarations: [
    StudentSignoutPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    StudentSignoutUiModule
  ],
  exports: [
    StudentSignoutPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentSignoutPageModule { }
