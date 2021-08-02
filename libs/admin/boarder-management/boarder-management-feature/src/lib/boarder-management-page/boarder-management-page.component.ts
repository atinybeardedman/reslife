import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { Boarder } from '@reslife/shared-models';
import { Observable } from 'rxjs';
import { BoarderManagementService } from '@reslife/admin-data-access';
import { MatDialog } from '@angular/material/dialog';
import { BoarderAction } from '@reslife/admin-model';

@Component({
  selector: 'reslife-boarder-management-page',
  templateUrl: './boarder-management-page.component.html',
  styleUrls: ['./boarder-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoarderManagementPageComponent implements OnInit {
  boarders$!: Observable<Boarder[]>;
  dorms$!: Observable<string[]>;
  @ViewChild(TemplateRef) dialogTemplate!: TemplateRef<any>;
  modalTitle = 'New Boarder';
  selectedBoarder!: Boarder | null;
  constructor(private bs: BoarderManagementService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.boarders$ = this.bs.getActiveBoarders();
    this.dorms$ = this.bs.getActiveDorms();
  }

  open(action?: BoarderAction): void {
    if(action){
      if (action.action === 'delete'){
        return
      } else {
        this.modalTitle = 'Edit Boarder';
        this.selectedBoarder = action.boarder;
      }
    }  
      
    this.dialog.open(this.dialogTemplate, {id: 'edit-boarder'});
    
  }

  saveBoarder(boarder: Boarder){
    this.dialog.getDialogById('edit-boarder')?.close();
    if(boarder.uid){
      this.bs.updateBoarder(boarder);
    } else {
      // create new
      this.bs.addBoarder(boarder);
    }
    this.selectedBoarder = null;
    
  }

}
