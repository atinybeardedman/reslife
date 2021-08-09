import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { Boarder } from '@reslife/shared-models';
import { Observable } from 'rxjs';
import { BoarderManagementService } from '@reslife/admin-data-access';
import { MatDialog } from '@angular/material/dialog';
import { BoarderAction } from '@reslife/admin-model';
import { ConfirmModalComponent } from '@reslife/admin-ui';

@Component({
  selector: 'reslife-boarder-management-page',
  templateUrl: './boarder-management-page.component.html',
  styleUrls: ['./boarder-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoarderManagementPageComponent implements OnInit {
  boarders$!: Observable<Boarder[]>;
  inactiveBoarders$!: Observable<Boarder[]>;
  dorms$!: Observable<string[]>;
  @ViewChild(TemplateRef) dialogTemplate!: TemplateRef<any>;
  modalTitle = 'New Boarder';
  selectedBoarder!: Boarder | null;
  constructor(private bs: BoarderManagementService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.boarders$ = this.bs.getActiveBoarders();
    this.inactiveBoarders$ = this.bs.getInactiveBoarders();
    this.dorms$ = this.bs.getActiveDorms();
  }

  edit(action?: BoarderAction): void {
    if(action){
        this.modalTitle = 'Edit Boarder';
        this.selectedBoarder = action.boarder;
      } else {
        this.modalTitle = 'Add Boarder';
        this.selectedBoarder = null;
      }

      
    this.dialog.open(this.dialogTemplate, {id: 'edit-boarder'});
  }

  delete(action: BoarderAction): void {
    this.dialog.open(ConfirmModalComponent, {
      data: {
        message: 'Are you sure you want to delete this boarder?'
      }
    }).afterClosed().subscribe(val => {
      if(val){
        this.bs.deleteBoarder(action.boarder);
      }
    });
  }

  async saveBoarder(boarder: Boarder){
    this.dialog.getDialogById('edit-boarder')?.close();
    if(boarder.uid){
      await this.bs.updateBoarder(boarder);
    } else {
      await this.bs.addBoarder(boarder);
    }
    this.selectedBoarder = null;
    
  }

}
