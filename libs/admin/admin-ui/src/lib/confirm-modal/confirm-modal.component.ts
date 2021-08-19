import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'reslife-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmModalComponent {
  @Input() message!: string;
  @Output() isConfirmed = new EventEmitter<boolean>();

}
