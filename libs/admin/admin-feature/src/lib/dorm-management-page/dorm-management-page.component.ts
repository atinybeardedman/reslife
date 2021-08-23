import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, ViewChild } from '@angular/core';
import { DormDocument, RecordAction } from '@reslife/shared-models';
import { ConfirmModalComponent, DormManagementModalComponent } from '@reslife/admin-ui';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DormManagementService } from '@reslife/admin-data-access';

@Component({
  selector: 'reslife-dorm-management-page',
  templateUrl: './dorm-management-page.component.html',
  styleUrls: ['./dorm-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DormManagementPageComponent implements OnInit {
  dorms$!: Observable<DormDocument[]>;
  modalTitle = 'New Dorm';
  @ViewChild('editTemplate')
  editDialogTemplate!: TemplateRef<DormManagementModalComponent>;
  @ViewChild('confirmTemplate')
  confirmDialogTemplate!: TemplateRef<ConfirmModalComponent>;
  selectedDorm!: DormDocument | null;
  constructor(
    private dms: DormManagementService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dorms$ = this.dms.getDorms();
    
  }

  edit(action?: RecordAction<DormDocument>): void {
    if (action) {
      this.modalTitle = 'Edit Dorm';
      this.selectedDorm = action.record;
    } else {
      this.modalTitle = 'New Dorm';
      this.selectedDorm = null;
    }

    this.dialog.open(this.editDialogTemplate, { id: 'edit-record' });
  }

  delete(action: RecordAction<DormDocument>): void {
    this.selectedDorm = action.record;
    this.dialog.open(this.confirmDialogTemplate, { id: 'confirm' });
  }

  async confirmDelete(shouldDelete: boolean): Promise<void> {
    this.dialog.getDialogById('confirm')?.close();
    if (shouldDelete) {
      await this.dms.deleteDorm(
        this.selectedDorm as DormDocument
      );
      this.selectedDorm = null;
    }
  }

  async saveRecord(record: DormDocument) {
    this.dialog.getDialogById('edit-record')?.close();
    if (this.selectedDorm) {
      await this.dms.updateDorm(record);
    } else {
      await this.dms.addDorm(record);
    }
    this.selectedDorm = null;
  }

}
