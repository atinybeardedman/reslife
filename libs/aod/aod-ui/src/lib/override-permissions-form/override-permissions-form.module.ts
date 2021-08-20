import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverridePermissionsFormComponent } from './override-permissions-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    OverridePermissionsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FlexLayoutModule
  ],
  exports: [
    OverridePermissionsFormComponent
  ]
})
export class OverridePermissionsFormModule { }
