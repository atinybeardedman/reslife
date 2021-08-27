import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { LeaveStayRequest } from '@reslife/admin-model';

@Component({
  selector: 'reslife-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestModalComponent {
  @Input() request!: LeaveStayRequest | null;
  @Input() readOnly = false;
  @Output() save = new EventEmitter<LeaveStayRequest>();


  get isValid(): boolean {
    if (this.request?.status === 'Rejected') {
      return typeof this.request.rejectionReason !== 'undefined' && this.request.rejectionReason !== '';
    }
    return this.request?.status === 'Approved';
  }

  emitRequest(): void {
    if (this.request) {
      this.save.emit(this.request);
    }
  }
}
