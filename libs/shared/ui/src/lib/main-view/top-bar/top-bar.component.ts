import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { StaffMember } from '@reslife/admin-model';

@Component({
  selector: 'reslife-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  @Input() title!: string;
  @Input() pageTitle!: string;
  @Input() user!: StaffMember | null;
  @Output() menuClick = new EventEmitter<Event>();
  @Output() logout = new EventEmitter<void>();
}
