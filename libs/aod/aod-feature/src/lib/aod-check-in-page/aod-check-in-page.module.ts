import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AodCheckInPageComponent } from './aod-check-in-page.component';
import { SharedUiModule } from '@reslife/shared/ui';
import { AodUiModule } from '@reslife/aod-ui';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AodCheckInPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedUiModule,
    AodUiModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AodCheckInPageComponent
  ]
})
export class AodCheckInPageModule { }
