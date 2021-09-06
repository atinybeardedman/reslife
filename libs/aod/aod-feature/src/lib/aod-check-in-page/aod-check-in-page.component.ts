import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Boarder, LeaveReturnTiming, NamedItem } from '@reslife/shared-models';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AodCheckInService,
  SharedAodDataService,
} from '@reslife/aod-data-access';
import { SearchSelectComponent } from '@reslife/shared/ui';
import { TimeExcusalDoc } from '@reslife/aod-model';
import { getDateString } from '@reslife/utils';
import { ConfirmModalComponent } from '@reslife/admin-ui';
import { RecordAction } from '@reslife/shared-models';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'reslife-aod-check-in-page',
  templateUrl: './aod-check-in-page.component.html',
  styleUrls: ['./aod-check-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AodCheckInPageComponent implements OnInit {
  excusalForm: FormGroup;
  boarders$!: Observable<Boarder[]>;
  checkIns$!: Observable<string[]>;
  excusals$!: Observable<TimeExcusalDoc[]>;
  selectedDate$ = new BehaviorSubject<string>(getDateString()); 
  selectedBoarder!: Boarder | null;
  selectedCheckIns: string[] = [];
  selectedTiming!: LeaveReturnTiming | null;
  selectedExcusal!: TimeExcusalDoc | null;

  @ViewChild(SearchSelectComponent) searchSelect!: SearchSelectComponent;

  @ViewChild('confirmTemplate')
  confirmDialogTemplate!: TemplateRef<ConfirmModalComponent>;
  constructor(
    fb: FormBuilder,
    private acs: AodCheckInService,
    private sad: SharedAodDataService,
    private dialog: MatDialog
  ) {
    this.excusalForm = fb.group({
      reason: ['', Validators.required],
      choice: ['check-in', Validators.required],
    });
  }

  get choice(): 'check-in' | 'time' {
    return this.excusalForm.controls.choice.value;
  }

  get reason(): string {
    return this.excusalForm.controls.reason.value;
  }


  ngOnInit() {
    this.boarders$ = this.sad.getActiveBoarders();
    this.checkIns$ = this.acs.getCheckIns();
    this.excusals$ = this.acs.getExcusals(this.selectedDate$);
  }

  selectBoarder(boarder: NamedItem): void {
    this.selectedBoarder = boarder as Boarder;
  }

  setSelectedCheckIns(checkIns: string[]): void {
    this.selectedCheckIns = checkIns;
    this.selectedTiming = null;
  }

  updateDate(val: Date): void {
    this.selectedDate$.next(getDateString(val));
  }

  setExcusalTiming(timing: LeaveReturnTiming | null): void {
    this.selectedCheckIns = [];
    this.selectedTiming = timing;
  }

  get isValidExcusal(): boolean {
    if (this.excusalForm.valid && this.selectedBoarder) {
      if (this.choice === 'check-in' && this.selectedCheckIns.length > 0) {
        return true;
      } else {
        if (this.choice === 'time' && this.selectedTiming) {
          return true;
        }
      }
    }
    return false;
  }


  async save(): Promise<void> {
    if(this.choice === 'check-in'){
      await this.acs.excuseByCheckIns(this.selectedBoarder as Boarder, this.reason, this.selectedCheckIns);
    } else {
      await this.acs.excuseByTime(this.selectedBoarder as Boarder, this.reason, this.selectedTiming as LeaveReturnTiming);
    }
    this.searchSelect.clear();
    this.excusalForm.controls.reason.reset();
    this.selectedBoarder = null;
  }
  
  delete(action: RecordAction<TimeExcusalDoc>): void {
    this.selectedExcusal = action.record;
    this.dialog.open(this.confirmDialogTemplate, { id: 'confirm' });
  }

  async confirmDelete(shouldDelete: boolean): Promise<void> {
    this.dialog.getDialogById('confirm')?.close();
    if(shouldDelete && this.selectedExcusal){
      await this.acs.deleteExcusal(this.selectedExcusal);
    }
    this.selectedExcusal = null;
  }
}
