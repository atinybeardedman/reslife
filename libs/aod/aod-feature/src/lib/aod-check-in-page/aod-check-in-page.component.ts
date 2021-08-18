import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Boarder, LeaveReturnTiming, NamedItem } from '@reslife/shared-models';
import { Observable } from 'rxjs';

@Component({
  selector: 'reslife-aod-check-in-page',
  templateUrl: './aod-check-in-page.component.html',
  styleUrls: ['./aod-check-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AodCheckInPageComponent {
  excusalForm: FormGroup;
  boarders$!: Observable<Boarder[]>;
  checkIns$!: Observable<string[]>;
  selectedBoarder!: Boarder | null;
  selectedCheckIns: string[] = [];
  selectedTiming!: LeaveReturnTiming | null;
  constructor(fb: FormBuilder) {
    this.excusalForm = fb.group({
      reason: ['', Validators.required],
      choice: ['check-in', Validators.required],
    });
  }

  get choice(): 'check-in' | 'time' {
    return this.excusalForm.controls.choice.value;
  }

  selectBoarder(boarder: NamedItem): void {
    this.selectedBoarder = boarder as Boarder;
  }

  setSelectedCheckIns(checkIns: string[]): void{
    this.selectedCheckIns = checkIns;
    this.selectedTiming = null;
  }

  setExcusalTiming(timing: LeaveReturnTiming): void {
    this.selectedCheckIns = [];
    this.selectedTiming = timing;
  }

  get isValid(): boolean {
    if(this.excusalForm.valid && this.selectedBoarder){
      if(this.choice === 'check-in' && this.selectedCheckIns.length > 0){
        return true
      } else {
        if(this.choice === 'time' && this.selectedTiming){
          return true
        }
      } 
    }
    return false
  }

  save(): void{
    console.log('saved');
  }
}
