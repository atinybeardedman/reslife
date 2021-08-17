import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DormDatePickerEvent } from '@reslife/shared-models';
import { DormNoteField} from '@reslife/dorm-notes-model'
import { Observable, Subject } from 'rxjs';
import { DormNotesDataService } from '@reslife/dorm-notes-data-access'
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'reslife-dorm-notes-page',
  templateUrl: './dorm-notes-page.component.html',
  styleUrls: ['./dorm-notes-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DormNotesPageComponent implements OnInit, OnDestroy {
  dorms$!: Observable<string[]>;
  selectedDormDate$ = new Subject<DormDatePickerEvent>();
  destroy$ = new Subject<void>();
  fields$!: Observable<DormNoteField[]>;
  trackByFn = (_index: number, item: DormNoteField) => {
    return item.uid;
  }
  constructor(private dnd: DormNotesDataService) { }

  ngOnInit(): void {
    this.dorms$ = this.dnd.getActiveDorms();
    this.selectedDormDate$.pipe(takeUntil(this.destroy$)).subscribe(choice => {
      if(choice){
        this.dnd.setDormandDate(choice);
        this.fields$ = this.dnd.getFields();
      }
    })
  }

  onChoiceSelected(choice: DormDatePickerEvent){
    this.selectedDormDate$.next(choice);
  }

  updateField(field: Partial<DormNoteField>): void {
    this.dnd.updateField(field);
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.unsubscribe();
   }

}
