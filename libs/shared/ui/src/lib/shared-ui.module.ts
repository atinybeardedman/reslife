import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarComponent } from './top-bar/top-bar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ReslifeMaterialModule } from './reslife-material/reslife-material.module';

@NgModule({
  declarations: [
    TopBarComponent,
    MainViewComponent
  ],
  imports: [
    CommonModule,
    ReslifeMaterialModule,
  ],
  exports: [
    TopBarComponent,
    MainViewComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedUiModule {}
