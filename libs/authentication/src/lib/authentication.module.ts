import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthenticationUiModule } from '@reslife/authentication-ui';
import { Route, RouterModule } from '@angular/router';
import { LoginViewComponent } from '@reslife/authentication-ui';

const routes:Route[] = [
  {
    path: '', component: LoginViewComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthenticationUiModule
  ],
})
export class AuthenticationModule {}
