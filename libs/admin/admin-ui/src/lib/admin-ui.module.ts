import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageBoardersTableModule } from './manage-boarders-table/manage-boarders-table.module';
import { EditBoarderModalModule } from './edit-boarder-modal/edit-boarder-modal.module';
import { ConfirmModalModule } from './confirm-modal/confirm-modal.module';
import { DormManagementTableModule } from './dorm-management-table/dorm-management-table.module';
import { DormManagementModalModule } from './dorm-management-modal/dorm-management-modal.module';
import { StaffManagementTableModule } from './staff-management-table/staff-management-table.module';
import { StaffManagementModalModule } from './staff-management-modal/staff-management-modal.module';
import { RegularScheduleAccordionModule } from './regular-schedule-accordion/regular-schedule-accordion.module';
import { RegularScheduleModalModule } from './regular-schedule-modal/regular-schedule-modal.module';
import { ScheduleExceptionsTableModule } from './schedule-exceptions-table/schedule-exceptions-table.module';
import { ScheduleExceptionModalModule } from './schedule-exception-modal/schedule-exception-modal.module';
import { AcademicYearPickerModule } from './academic-year-picker/academic-year-picker.module';
import { EditAcademicYearCardModule } from './edit-academic-year-card/edit-academic-year-card.module';
import { BreakManagementTableModule } from './break-management-table/break-management-table.module';
import { EditBreakModalModule } from './edit-break-modal/edit-break-modal.module';

@NgModule({
  imports: [
    CommonModule,
    ManageBoardersTableModule,
    EditBoarderModalModule,
    ConfirmModalModule,
    DormManagementTableModule,
    DormManagementModalModule,
    StaffManagementTableModule,
    StaffManagementModalModule,
    RegularScheduleAccordionModule,
    RegularScheduleModalModule,
    ScheduleExceptionsTableModule,
    ScheduleExceptionModalModule,
    AcademicYearPickerModule,
    EditAcademicYearCardModule,
    BreakManagementTableModule,
    EditBreakModalModule,
  ],
  exports: [
    ManageBoardersTableModule,
    EditBoarderModalModule,
    ConfirmModalModule,
    DormManagementTableModule,
    DormManagementModalModule,
    StaffManagementTableModule,
    StaffManagementModalModule,
    RegularScheduleAccordionModule,
    RegularScheduleModalModule,
    ScheduleExceptionsTableModule,
    ScheduleExceptionModalModule,
    AcademicYearPickerModule,
    EditAcademicYearCardModule,
    BreakManagementTableModule,
    EditBreakModalModule,
  ],
})
export class AdminUiModule {}
