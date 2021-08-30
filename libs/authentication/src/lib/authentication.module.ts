import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
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
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthenticationUiModule,
  ],
  declarations: [
    LoginPageComponent
  ],
})
export class AuthenticationModule {}
