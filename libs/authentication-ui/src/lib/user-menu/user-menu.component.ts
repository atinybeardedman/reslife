import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { StaffMember } from '@reslife/admin-model';
import firebase from 'firebase';
@Component({
  selector: 'reslife-user-menu',
  templateUrl: './user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  @Input() user!: StaffMember | firebase.User | null;
  @Output() logout = new EventEmitter<void>();

  private isStaff(user: StaffMember | firebase.User): user is StaffMember {
    return typeof (<StaffMember>user).roles !== 'undefined';
  }
  get name(): string {
    if (this.user) {
      if (this.isStaff(this.user)) {
        return this.user.name;
      } else {
        return (<firebase.User>this.user).displayName as string;
      }
    }
    return '';
  }
}
