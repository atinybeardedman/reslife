import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { Boarder } from '@reslife/shared-models';
import { Observable } from 'rxjs';
import { BoarderManagementService } from '@reslife/admin-data-access';
import { MatDialog } from '@angular/material/dialog';
import { BoarderAction } from '@reslife/admin-model';
import { ConfirmModalComponent, EditBoarderModalComponent } from '@reslife/admin-ui';

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
  @ViewChild('editTemplate') editDialogTemplate!: TemplateRef<EditBoarderModalComponent>;
  @ViewChild('confirmTemplate') confirmDialogTemplate!: TemplateRef<ConfirmModalComponent>;
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

      
    this.dialog.open(this.editDialogTemplate, {id: 'edit-boarder'});
  }

  delete(action: BoarderAction): void {
    this.selectedBoarder = action.boarder;
    this.dialog.open(this.confirmDialogTemplate, {id: 'confirm'});
  }

  async confirmDelete(shouldDelete: boolean): Promise<void> {
    this.dialog.getDialogById('confirm')?.close();
    if(shouldDelete){
      await this.bs.deleteBoarder(this.selectedBoarder as Boarder);
      this.selectedBoarder = null;

    }
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
