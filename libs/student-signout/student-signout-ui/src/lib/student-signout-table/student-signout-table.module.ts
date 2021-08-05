import { CommonModule } from '@angular/common';
import { StudentSignoutTableComponent } from './student-signout-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";


@NgModule({
  declarations: [
    StudentSignoutTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule
  ],
  exports: [
    StudentSignoutTableComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentSignoutTableModule { }
