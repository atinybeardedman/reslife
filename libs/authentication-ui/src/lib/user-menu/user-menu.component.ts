import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { StaffMember } from '@reslife/admin-model'
@Component({
  selector: 'reslife-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent  {

 @Input() user!: StaffMember;
 @Output() logout = new EventEmitter<void>();

}
