import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'reslife-login-view',
  templateUrl: './login-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginViewComponent {
  @Output() login = new EventEmitter<void>();

}
