import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '@reslife/auth-data-access';
import { take } from 'rxjs/operators';
import { InfoDialogService } from '@reslife/shared/ui';
import { Router } from '@angular/router';
@Component({
  selector: 'reslife-login-page',
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  constructor(
    private as: AuthenticationService,
    private ids: InfoDialogService,
    private router: Router
  ) {}

  async login(): Promise<void> {
    await this.as.login();
    const user = await this.as.getUser().pipe(take(1)).toPromise();
    if (!user) {
      await this.as.logout();
      this.ids.open(
        'You are not authorized to view this application. Please contact the Dean to get access'
      );
    } else {
      this.router.navigateByUrl('');
    }
  }
}
