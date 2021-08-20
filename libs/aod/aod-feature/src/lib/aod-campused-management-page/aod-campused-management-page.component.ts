import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Boarder, CampusedStudentRecord } from '@reslife/shared-models';
import { ConfirmModalComponent } from '@reslife/admin-ui';
import { MatDialog } from '@angular/material/dialog';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AodSignoutDataService,
  SharedAodDataService,
} from '@reslife/aod-data-access';
import { RecordAction } from '@reslife/aod-model';
import { EditCampusedModalComponent } from '@reslife/aod-ui';
@Component({
  selector: 'reslife-aod-campused-management-page',
  templateUrl: './aod-campused-management-page.component.html',
  styleUrls: ['./aod-campused-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AodCampusedManagementPageComponent implements OnInit {
  boarders$!: Observable<Boarder[]>;
  campused$!: Observable<CampusedStudentRecord[]>;
  modalTitle = 'Add Campused Record';
  @ViewChild('editTemplate')
  editDialogTemplate!: TemplateRef<EditCampusedModalComponent>;
  @ViewChild('confirmTemplate')
  confirmDialogTemplate!: TemplateRef<ConfirmModalComponent>;
  selectedRecord!: CampusedStudentRecord | null;
  constructor(
    private sas: SharedAodDataService,
    private asds: AodSignoutDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.campused$ = this.asds.getCampusedStudents();
    this.boarders$ = combineLatest([this.sas.getActiveBoarders(), this.campused$]).pipe(
      map(([boarders, campused]) => boarders.filter(b => typeof campused.find(c => c.student.uid === b.uid) === 'undefined'))
    );
    
  }

  edit(action?: RecordAction<CampusedStudentRecord>): void {
    if (action) {
      this.modalTitle = 'Edit Campused Record';
      this.selectedRecord = action.record;
    } else {
      this.modalTitle = 'Add Campused Record';
      this.selectedRecord = null;
    }

    this.dialog.open(this.editDialogTemplate, { id: 'edit-record' });
  }

  delete(action: RecordAction<CampusedStudentRecord>): void {
    this.selectedRecord = action.record;
    this.dialog.open(this.confirmDialogTemplate, { id: 'confirm' });
  }

  async confirmDelete(shouldDelete: boolean): Promise<void> {
    this.dialog.getDialogById('confirm')?.close();
    if (shouldDelete) {
      await this.asds.deleteCampusedRecord(
        this.selectedRecord as CampusedStudentRecord
      );
      this.selectedRecord = null;
    }
  }

  async saveRecord(record: CampusedStudentRecord) {
    this.dialog.getDialogById('edit-record')?.close();
    if (this.selectedRecord) {
      await this.asds.updateCampusedRecord(record);
    } else {
      await this.asds.addCampusedRecord(record);
    }
    this.selectedRecord = null;
  }
}
