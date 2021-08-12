import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoomInspectionPickerEvent, RoomInspectionStudentDoc } from '@reslife/room-inspection-model';
import { RoomInspectionFailModalComponent } from '@reslife/room-inspection-ui';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoomInspectionDataService } from '@reslife/room-inspection-data-access';
@Component({
  selector: 'reslife-room-inspection-page',
  templateUrl: './room-inspection-page.component.html',
  styleUrls: ['./room-inspection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomInspectionPageComponent implements OnDestroy {
  inspectionId$ = new Subject<string>();
  dorms$!: Observable<string[]>;
  toInspect$!: Observable<RoomInspectionStudentDoc[]>;
  inspected$!: Observable<RoomInspectionStudentDoc[]>;
  destroy$ = new Subject<void>();
  selectedFailed!: RoomInspectionStudentDoc | null;
  @ViewChild(TemplateRef) dialogTemplate!: TemplateRef<RoomInspectionFailModalComponent>;
  constructor(private dialog: MatDialog, private rds: RoomInspectionDataService) {
    this.inspectionId$.pipe(takeUntil(this.destroy$)).subscribe(id => {
      if(id){
        this.rds.setInspection(id);
        this.toInspect$ = this.rds.getToInspect()
        this.inspected$ = this.rds.getInspected()
      }
    })
   }

   ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.unsubscribe();
   }


  checkForSave(doc: RoomInspectionStudentDoc): void {
    if(doc.result === 'failed'){
      this.selectedFailed = doc;
      this.dialog.open(this.dialogTemplate, {id: 'fail'});
    } else {
      this.saveInspection(doc);
    }
    
  }
  saveInspection(doc: RoomInspectionStudentDoc): void {
    this.dialog.getDialogById('fail')?.close();
    this.rds.saveInspection(doc);
    this.selectedFailed = null;
  }

  onInspectionSelected(inspection: RoomInspectionPickerEvent): void {
    this.inspectionId$.next(`${inspection.date}+${inspection.dorm}`);
  }

}

