import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentSignoutTableModule } from './student-signout-table/student-signout-table.module';
import { StudentSignoutModalModule } from './student-signout-modal/student-signout-modal.module';

@NgModule({
  imports: [CommonModule, StudentSignoutTableModule, StudentSignoutModalModule],
  exports: [
    StudentSignoutTableModule,
    StudentSignoutModalModule
  ]
})
export class StudentSignoutUiModule {}
