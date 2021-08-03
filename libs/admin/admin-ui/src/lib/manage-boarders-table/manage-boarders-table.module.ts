import { CommonModule } from "@angular/common";
import { ManageBoardersTableComponent } from "./manage-boarders-table.component";
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";


@NgModule({
    declarations: [ManageBoardersTableComponent],
    imports: [
      CommonModule,
      MatButtonModule,
      MatTableModule,
      MatIconModule,
      MatPaginatorModule
    ],
    exports: [ManageBoardersTableComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class ManageBoardersTableModule {}