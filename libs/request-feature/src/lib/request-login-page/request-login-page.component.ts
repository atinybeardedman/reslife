import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '@reslife/request-data-access';
import { InfoDialogService } from '@reslife/shared/ui';
import { Router } from '@angular/router';
@Component({
  selector: 'reslife-request-login-page',
  templateUrl: './request-login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestLoginPageComponent  {

  constructor(private as: AuthService, private ids: InfoDialogService, private router: Router){}

  async login(): Promise<void> {
    try {
      await this.as.login();
    } catch(err){
      console.log(err);
      this.ids.open(
        'You are not authorized to view this application. You must use your oakwoodfriends.org email address'
      );
      return
    }
    this.router.navigateByUrl('');


  }


}
