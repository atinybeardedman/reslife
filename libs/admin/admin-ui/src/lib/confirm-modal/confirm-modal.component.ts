import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'reslife-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string} ) { }

}
