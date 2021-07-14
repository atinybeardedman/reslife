import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShellModule } from './app-shell/app-shell.module';

@NgModule({
  imports: [CommonModule, AppShellModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedUiModule {}
