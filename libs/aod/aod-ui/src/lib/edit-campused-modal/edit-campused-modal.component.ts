import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Boarder,
  CampusedStudentRecord,
  NamedItem,
  SimpleItem,
} from '@reslife/shared-models';
import { getDateFromDatestring, getDateString } from '@reslife/utils';

@Component({
  selector: 'reslife-edit-campused-modal',
  templateUrl: './edit-campused-modal.component.html',
  styleUrls: ['./edit-campused-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCampusedModalComponent implements OnChanges {
  @Input() boarders!: Boarder[] | null;
  @Input() title!: string;
  @Input() record!: CampusedStudentRecord | null;

  @Output() save = new EventEmitter<CampusedStudentRecord>();
  selectedBoarder!: SimpleItem | null;
  campusedTimingForm!: FormGroup;
  constructor(fb: FormBuilder) {
    this.campusedTimingForm = fb.group({
      startDate: [new Date(), Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.record && this.record) {
      this.fillFields(this.record);
    }
  }

  selectBoarder(boarder: NamedItem): void {
    const simple = boarder as SimpleItem;
    this.selectedBoarder = {
      name: simple.name,
      uid: simple.uid
    }
  }

  fillFields(record: CampusedStudentRecord): void {
    this.selectedBoarder = {
      name: record.student.name,
      uid: record.student.uid,
    };
    this.campusedTimingForm.controls.startDate.setValue(
      getDateFromDatestring(record.startDate)
    );
    this.campusedTimingForm.controls.endDate.setValue(
      getDateFromDatestring(record.endDate)
    );
  }

  get editedRecord(): CampusedStudentRecord {
    let record: CampusedStudentRecord;

    const { startDate, endDate } = this.campusedTimingForm.controls;

    if (this.record) {
      record = {
        ...this.record,
        startDate: getDateString(startDate.value),
        endDate: getDateString(endDate.value),
      };
    } else {
      record = {
        student: this.selectedBoarder as SimpleItem,
        startDate: getDateString(startDate.value),
        endDate: getDateString(endDate.value),
        uid: ''
      };
    }
    return record;
  }
}
