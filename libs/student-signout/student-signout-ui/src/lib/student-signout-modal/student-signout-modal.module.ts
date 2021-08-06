import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentSignoutModalComponent } from './student-signout-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedUiModule } from '@reslife/shared/ui'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    StudentSignoutModalComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
    
  ],
  exports: [
    StudentSignoutModalComponent
  ]
})
export class StudentSignoutModalModule { }
