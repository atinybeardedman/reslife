import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProcessRequestsService } from '@reslife/admin-data-access';
import { LeaveStayRequest } from '@reslife/admin-model';
import { RequestModalComponent } from '@reslife/admin-ui';
import { RecordAction } from '@reslife/shared-models';
import { Observable } from 'rxjs';

@Component({
  selector: 'reslife-process-requests-page',
  templateUrl: './process-requests-page.component.html',
  styleUrls: ['./process-requests-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcessRequestsPageComponent implements OnInit {
  pendingRequests$!: Observable<LeaveStayRequest[]>;
  pastRequests$!: Observable<LeaveStayRequest[]>;
  selectedRequest!: LeaveStayRequest | null;
  @ViewChild('editTemplate') editDialogTemplate!: TemplateRef<RequestModalComponent>;
  @ViewChild('readOnlyTemplate') readOnlyDialogTemplate!: TemplateRef<RequestModalComponent>;
  constructor(private prs: ProcessRequestsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.pendingRequests$ = this.prs.getPendingRequests();
    this.pastRequests$ = this.prs.getPastRequests();
  }

  openEdit(action: RecordAction<LeaveStayRequest>): void {
    this.selectedRequest = action.record;
    this.dialog.open(this.editDialogTemplate, { id: 'edit-record' });
  }

  openReadOnly(action: RecordAction<LeaveStayRequest>): void {
    this.selectedRequest = action.record;
    this.dialog.open(this.readOnlyDialogTemplate, { id: 'read-record' });
  }

  async save(request: LeaveStayRequest): Promise<void> {
    this.dialog.getDialogById('edit-record')?.close();
    await this.prs.processRequest(request);
    this.selectedRequest = null;
  }

}
