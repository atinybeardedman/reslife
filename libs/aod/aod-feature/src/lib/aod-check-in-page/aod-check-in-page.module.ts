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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmModalModule } from '@reslife/admin-ui';


@NgModule({
  declarations: [
    AodCheckInPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    SharedUiModule,
    AodUiModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmModalModule
  ],
  exports: [
    AodCheckInPageComponent
  ]
})
export class AodCheckInPageModule { }
