import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DormManagementPageComponent } from './dorm-management-page.component';
import { AdminUiModule } from '@reslife/admin-ui';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [DormManagementPageComponent],
  imports: [
    CommonModule,
    AdminUiModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
  ],
  exports: [DormManagementPageComponent],
})
export class DormManagementPageModule {}
