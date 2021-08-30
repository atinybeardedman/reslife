import {
  Component,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewChild,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleService } from '@reslife/admin-data-access';
import { ScheduleItem } from '@reslife/admin-model';
import {
  RegularScheduleModalComponent,
  ConfirmModalComponent,
} from '@reslife/admin-ui';
import { RecordAction } from '@reslife/shared-models';

@Component({
  selector: 'reslife-regular-schedule-tab',
  templateUrl: './regular-schedule-tab.component.html',
  styleUrls: ['./regular-schedule-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegularScheduleTabComponent {
  @Input() scheduleItems!: ScheduleItem[] | null;
  @Input() selectedYear!: string | null;
  modalTitle = 'New Check In';
  @ViewChild('editTemplate')
  editDialogTemplate!: TemplateRef<RegularScheduleModalComponent>;
  @ViewChild('confirmTemplate')
  confirmDialogTemplate!: TemplateRef<ConfirmModalComponent>;
  selectedScheduleItem!: ScheduleItem | null;
  constructor(private ss: ScheduleService, private dialog: MatDialog) {}
  edit(action?: RecordAction<ScheduleItem>): void {
    if (action) {
      this.modalTitle = 'Edit Check In';
      this.selectedScheduleItem = action.record;
    } else {
      this.modalTitle = 'New Check In';
      this.selectedScheduleItem = null;
    }

    this.dialog.open(this.editDialogTemplate, { id: 'edit-record' });
  }

  delete(action: RecordAction<ScheduleItem>): void {
    this.selectedScheduleItem = action.record;
    this.dialog.open(this.confirmDialogTemplate, { id: 'confirm' });
  }

  async confirmDelete(shouldDelete: boolean): Promise<void> {
    this.dialog.getDialogById('confirm')?.close();
    if (shouldDelete) {
      await this.ss.deleteScheduleItem(
        this.selectedScheduleItem as ScheduleItem
      );
      this.selectedScheduleItem = null;
    }
  }

  async saveRecord(record: ScheduleItem) {
    this.dialog.getDialogById('edit-record')?.close();
    if (this.selectedScheduleItem) {
      await this.ss.updateScheduleItem(record);
    } else {
      await this.ss.addScheduleItem(record);
    }
    this.selectedScheduleItem = null;
  }
}
