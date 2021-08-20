import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInBasedExcusalFormModule } from './check-in-based-excusal-form/check-in-based-excusal-form.module';
import { TimeBasedExcusalFormModule } from './time-based-excusal-form/time-based-excusal-form.module';
import { CampusedManagementTableModule } from './campused-management-table/campused-management-table.module';
import { EditCampusedModalModule } from './edit-campused-modal/edit-campused-modal.module';
import { OneTimeSignoutFormModule } from './one-time-signout-form/one-time-signout-form.module';
import { OverridePermissionsFormModule } from './override-permissions-form/override-permissions-form.module';

@NgModule({
  imports: [
    CommonModule,
    CheckInBasedExcusalFormModule,
    TimeBasedExcusalFormModule,
    CampusedManagementTableModule,
    EditCampusedModalModule,
    OneTimeSignoutFormModule,
    OverridePermissionsFormModule,
  ],
  exports: [
    CheckInBasedExcusalFormModule,
    TimeBasedExcusalFormModule,
    CampusedManagementTableModule,
    EditCampusedModalModule,
    OneTimeSignoutFormModule,
    OverridePermissionsFormModule,
  ]
})
export class AodUiModule {}
