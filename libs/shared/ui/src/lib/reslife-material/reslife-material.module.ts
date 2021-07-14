import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  declarations: [],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule],
  exports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule],
})
export class ReslifeMaterialModule {}
