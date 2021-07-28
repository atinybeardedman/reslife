import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoarderManagementPageComponent } from './boarder-management-page.component';
import { AdminUiModule } from '@reslife/admin-ui';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  imports: [CommonModule, AdminUiModule, MatButtonModule],
  exports: [
    BoarderManagementPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    BoarderManagementPageComponent,
  ],
})
export class BoarderManagementPageModule {}