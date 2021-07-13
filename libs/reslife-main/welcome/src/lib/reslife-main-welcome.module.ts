import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const reslifeMainWelcomeRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      component: WelcomePageComponent
    }
  ])],
  declarations: [
    WelcomePageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReslifeMainWelcomeModule {}
