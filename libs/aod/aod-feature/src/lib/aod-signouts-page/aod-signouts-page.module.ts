import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AodSignoutsPageComponent } from './aod-signouts-page.component';
import { AodUiModule } from '@reslife/aod-ui';
import { SharedUiModule } from '@reslife/shared/ui';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AodSignoutsPageComponent
  ],
  imports: [
    CommonModule,
    AodUiModule,
    SharedUiModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AodSignoutsPageComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AodSignoutsPageModule { }
