
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout'
@NgModule({
  declarations: [WelcomePageComponent],
  imports: [CommonModule, MatCardModule, FlexLayoutModule],
  exports: [WelcomePageComponent],
})
export class WelcomePageModule {}