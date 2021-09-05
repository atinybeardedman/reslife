import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffManagementPageComponent } from './staff-management-page.component';
import { AdminUiModule } from '@reslife/admin-ui';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [StaffManagementPageComponent],
  imports: [
    CommonModule,
    AdminUiModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
  ],
  exports: [StaffManagementPageComponent],
})
export class StaffManagementPageModule {}
