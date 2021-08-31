import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RequestLoginPageComponent } from './request-login-page/request-login-page.component';
import { RequestFormParentComponent } from './request-form-parent/request-form-parent.component';
import { AuthenticationUiModule } from '@reslife/authentication-ui';
import { MatDialogModule } from '@angular/material/dialog';
const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Route[] = [
  {
    path: '',
    component: RequestFormParentComponent,
    ...canActivate(redirectToLogin),
  },
  { path: 'login', component: RequestLoginPageComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes), AuthenticationUiModule, MatDialogModule],
  exports: [RouterModule],
  declarations: [RequestLoginPageComponent, RequestFormParentComponent],
})
export class RequestFeatureModule {}
