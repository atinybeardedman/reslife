import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationUiModule } from '@reslife/authentication-ui';
import { Route, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
const routes:Route[] = [
  {
    path: '', component: LoginPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
   
    AuthenticationUiModule,
  ],
  declarations: [
    LoginPageComponent
  ],
})
export class AuthenticationModule {}
