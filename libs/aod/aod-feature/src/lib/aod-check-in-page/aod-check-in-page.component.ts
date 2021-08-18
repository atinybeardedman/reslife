import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Boarder, LeaveReturnTiming, NamedItem } from '@reslife/shared-models';
import { Observable } from 'rxjs';
import {
  AodCheckInService,
  SharedAodDataService,
} from '@reslife/aod-data-access';
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
  selectedBoarder!: Boarder | null;
  selectedCheckIns: string[] = [];
  selectedTiming!: LeaveReturnTiming | null;
  constructor(
    fb: FormBuilder,
    private acs: AodCheckInService,
    private sad: SharedAodDataService
  ) {
    this.excusalForm = fb.group({
      reason: ['', Validators.required],
      choice: ['check-in', Validators.required],
    });
  }

  get choice(): 'check-in' | 'time' {
    return this.excusalForm.controls.choice.value;
  }

  ngOnInit() {
    this.boarders$ = this.sad.getActiveBoarders();
    this.checkIns$ = this.acs.getCheckIns();
  }

  selectBoarder(boarder: NamedItem): void {
    this.selectedBoarder = boarder as Boarder;
  }

  setSelectedCheckIns(checkIns: string[]): void {
    this.selectedCheckIns = checkIns;
    this.selectedTiming = null;
  }

  setExcusalTiming(timing: LeaveReturnTiming | null): void {
    this.selectedCheckIns = [];
    this.selectedTiming = timing;
  }

  get isValid(): boolean {
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

  save(): void {
    console.log('saved');
  }
}
