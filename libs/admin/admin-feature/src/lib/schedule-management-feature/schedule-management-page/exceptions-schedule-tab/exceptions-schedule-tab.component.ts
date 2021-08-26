import { Component, ChangeDetectionStrategy, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleService } from '@reslife/admin-data-access';
import { ScheduleDayException, ScheduleItem } from '@reslife/admin-model';
import { ConfirmModalComponent, ScheduleExceptionModalComponent } from '@reslife/admin-ui';
import { RecordAction } from '@reslife/shared-models';

@Component({
  selector: 'reslife-exceptions-schedule-tab',
  templateUrl: './exceptions-schedule-tab.component.html',
  styleUrls: ['./exceptions-schedule-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExceptionsScheduleTabComponent {
  @Input() exceptions!: ScheduleDayException[] | null;
  @Input() regularSchedule!: ScheduleItem[] | null;
  @Input() academicYear!: string | null;

  modalTitle = 'New Exception';
  @ViewChild('editTemplate')
  editDialogTemplate!: TemplateRef<ScheduleExceptionModalComponent>;
  @ViewChild('confirmTemplate')
  confirmDialogTemplate!: TemplateRef<ConfirmModalComponent>;
  selectedException!: ScheduleDayException | null;
  constructor(private ss: ScheduleService, private dialog: MatDialog) { }

  edit(action?: RecordAction<ScheduleDayException>): void {
    if (action) {
      this.modalTitle = 'Edit Exception';
      this.selectedException = action.record;
    } else {
      this.modalTitle = 'New Exception';
      this.selectedException = null;
    }

    this.dialog.open(this.editDialogTemplate, { id: 'edit-record' });
  }

  delete(action: RecordAction<ScheduleDayException>): void {
    this.selectedException = action.record;
    this.dialog.open(this.confirmDialogTemplate, { id: 'confirm' });
  }

  async confirmDelete(shouldDelete: boolean): Promise<void> {
    this.dialog.getDialogById('confirm')?.close();
    if (shouldDelete) {
      await this.ss.deleteException(
        this.selectedException as ScheduleDayException
      );
      this.selectedException = null;
    }
  }

  async saveRecord(record: ScheduleDayException) {
    this.dialog.getDialogById('edit-record')?.close();
    if (this.selectedException) {
      await this.ss.updateException(record);
    } else {
      await this.ss.addException(record);
    }
    this.selectedException = null;
  }


}
