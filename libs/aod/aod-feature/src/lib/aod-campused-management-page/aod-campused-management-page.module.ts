import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AodCampusedManagementPageComponent } from './aod-campused-management-page.component';
import { AodUiModule } from '@reslife/aod-ui';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AdminUiModule } from '@reslife/admin-ui';



@NgModule({
  declarations: [
    AodCampusedManagementPageComponent
  ],
  imports: [
    CommonModule,
    AodUiModule,
    AdminUiModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
  ],
  exports: [
    AodCampusedManagementPageComponent
  ]
})
export class AodCampusedManagementPageModule { }
