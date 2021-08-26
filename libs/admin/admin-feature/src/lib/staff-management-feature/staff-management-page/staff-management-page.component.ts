import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StaffManagementService } from '@reslife/admin-data-access';
import { StaffMember } from '@reslife/admin-model';
import { DormManagementModalComponent, ConfirmModalComponent } from '@reslife/admin-ui';
import { RecordAction } from '@reslife/shared-models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'reslife-staff-management-page',
  templateUrl: './staff-management-page.component.html',
  styleUrls: ['./staff-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffManagementPageComponent implements OnInit {
  staff$!: Observable<StaffMember[]>;
  emails$!: Observable<string[]>;
  modalTitle = 'New Dorm';
  @ViewChild('editTemplate')
  editDialogTemplate!: TemplateRef<DormManagementModalComponent>;
  @ViewChild('confirmTemplate')
  confirmDialogTemplate!: TemplateRef<ConfirmModalComponent>;
  selectedStaff!: StaffMember | null;
  constructor(
    private sms: StaffManagementService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.staff$ = this.sms.getStaff();
    this.emails$ = this.staff$.pipe(
      map(staff => staff.map(s => s.email))
    );
    
  }

  edit(action?: RecordAction<StaffMember>): void {
    if (action) {
      this.modalTitle = 'Edit Staff Member';
      this.selectedStaff = action.record;
    } else {
      this.modalTitle = 'New Staff Member';
      this.selectedStaff = null;
    }

    this.dialog.open(this.editDialogTemplate, { id: 'edit-record' });
  }

  delete(action: RecordAction<StaffMember>): void {
    this.selectedStaff = action.record;
    this.dialog.open(this.confirmDialogTemplate, { id: 'confirm' });
  }

  async confirmDelete(shouldDelete: boolean): Promise<void> {
    this.dialog.getDialogById('confirm')?.close();
    if (shouldDelete) {
      await this.sms.deleteStaff(
        this.selectedStaff as StaffMember
      );
      this.selectedStaff = null;
    }
  }

  async saveRecord(record: StaffMember) {
    this.dialog.getDialogById('edit-record')?.close();
    if (this.selectedStaff) {
      await this.sms.updateStaff(record);
    } else {
      await this.sms.addStaff(record);
    }
    this.selectedStaff = null;
  }

}
