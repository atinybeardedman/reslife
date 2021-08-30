import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthenticationUiModule } from '@reslife/authentication-ui'
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [MainViewComponent, TopBarComponent, SidenavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    AuthenticationUiModule,
    FlexLayoutModule
  ],
  exports: [MainViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainViewModule {}
