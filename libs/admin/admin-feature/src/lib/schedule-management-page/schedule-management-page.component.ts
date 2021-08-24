import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleService } from '@reslife/admin-data-access';
import { ScheduleItem } from '@reslife/admin-model';
import {
  ConfirmModalComponent,
  RegularScheduleModalComponent,
} from '@reslife/admin-ui';
import { RecordAction } from '@reslife/shared-models';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'reslife-schedule-management-page',
  templateUrl: './schedule-management-page.component.html',
  styleUrls: ['./schedule-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleManagementPageComponent implements OnInit {
  scheduleItems$!: Observable<ScheduleItem[]>;
  years$!: Observable<string[]>;
  selectedYear$ = new ReplaySubject<string>(1);
  modalTitle = 'New Check In';
  @ViewChild('editTemplate')
  editDialogTemplate!: TemplateRef<RegularScheduleModalComponent>;
  @ViewChild('confirmTemplate')
  confirmDialogTemplate!: TemplateRef<ConfirmModalComponent>;
  selectedScheduleItem!: ScheduleItem | null;
  constructor(private ss: ScheduleService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.years$ = this.ss.getAcademicYears();
    this.scheduleItems$ = this.selectedYear$.pipe(
      switchMap((year) => this.ss.getScheduleItems(year))
    );
    this.ss.getSuggestedYear().then(year => this.selectedYear$.next(year));
  }

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
      await this.ss.deleteScheduleItem(this.selectedScheduleItem as ScheduleItem);
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
