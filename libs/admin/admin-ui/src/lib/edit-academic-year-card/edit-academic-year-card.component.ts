import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  AcademicYear,
  AcademicYearSaveEvent,
  NamedTimeSpan,
} from '@reslife/admin-model';
import { RecordAction } from '@reslife/shared-models';
import {
  getAcademicYear,
  getDateFromDatestring,
  getDateString,
} from '@reslife/utils';
import { BehaviorSubject, Subject } from 'rxjs';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { EditBreakModalComponent } from './edit-break-modal/edit-break-modal.component';

@Component({
  selector: 'reslife-edit-academic-year-card',
  templateUrl: './edit-academic-year-card.component.html',
  styleUrls: ['./edit-academic-year-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAcademicYearCardComponent implements OnChanges {
  @Input() breaks!: NamedTimeSpan[] | null;
  @Input() yearDoc!: AcademicYear | null;
  @Output() save = new EventEmitter<AcademicYearSaveEvent>();
  modalTitle: 'New Break' | 'Edit Break' = 'New Break';
  selectedBreak!: NamedTimeSpan | null;
  removedBreaks: Map<string, boolean> = new Map();
  editedBreaks: Map<string, NamedTimeSpan> = new Map();
  filteredBreaks$ = new BehaviorSubject<NamedTimeSpan[]>([]);
  @ViewChild('editTemplate')
  editDialogTemplate!: TemplateRef<EditBreakModalComponent>;
  @ViewChild('confirmTemplate')
  confirmDialogTemplate!: TemplateRef<ConfirmModalComponent>;

  startEndStepGroup: FormGroup;
  constructor(fb: FormBuilder, private dialog: MatDialog) {
    this.startEndStepGroup = fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.yearDoc && this.yearDoc?.uid !== '') {
      this.modalTitle = 'Edit Break';
      this.startEndStepGroup.setValue({
        startDate: getDateFromDatestring(this.yearDoc?.start),
        endDate: getDateFromDatestring(this.yearDoc?.end),
      });
    }
    if (changes.breaks && this.breaks) {
      this.updateList();
    }
  }

  updateList(): void {
    const inputBreaks = this.breaks || [];
    const filteredInputs = inputBreaks.filter((b) => !(this.removedBreaks.has(b.uid) || this.editedBreaks.has(b.uid)));
    const newList = [...filteredInputs, ...this.editedBreaks.values()];
        this.filteredBreaks$.next(newList);
  }

  get editedDoc(): AcademicYearSaveEvent {
    const year: AcademicYear = {
      name: this.yearDoc?.name || getAcademicYear(),
      uid: this.yearDoc?.uid || getAcademicYear(),
      start: getDateString(this.startEndStepGroup.controls.startDate.value),
      end: getDateString(this.startEndStepGroup.controls.endDate.value),
    };
    const breaks = [...this.filteredBreaks$.value];

    return {
      year,
      breaks,
    };
  }

  edit(action?: RecordAction<NamedTimeSpan>): void {
    if (action) {
      this.modalTitle = 'Edit Break';
      this.selectedBreak = action.record;
    } else {
      this.modalTitle = 'New Break';
      this.selectedBreak = null;
    }

    this.dialog.open(this.editDialogTemplate, { id: 'edit-record' });
  }

  delete(action: RecordAction<NamedTimeSpan>): void {
    this.selectedBreak = action.record;
    this.dialog.open(this.confirmDialogTemplate, { id: 'confirm' });
  }

  confirmDelete(shouldDelete: boolean): void {
    this.dialog.getDialogById('confirm')?.close();
    if (shouldDelete && this.selectedBreak) {
      this.removedBreaks.set(this.selectedBreak.uid, true);
      if(this.editedBreaks.has(this.selectedBreak.uid)){
        this.editedBreaks.delete(this.selectedBreak.uid);
      }
      this.updateList();
    }
    this.selectedBreak = null;
  }

  getTempUid(): string {
    return 'temp+' + this.filteredBreaks$.value.length + 1;
  }

  saveRecord(record: NamedTimeSpan) {
    this.dialog.getDialogById('edit-record')?.close();
    if(this.selectedBreak){
      this.editedBreaks.set(record.uid, record);
    } else {
      record.uid = this.getTempUid()
      this.editedBreaks.set(record.uid, record);
    }
    this.updateList();
    
    this.selectedBreak = null;
  }
}
