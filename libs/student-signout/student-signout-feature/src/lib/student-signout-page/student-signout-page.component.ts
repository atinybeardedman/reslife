import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BoarderSignoutMeta, StudentSignout } from '@reslife/student-signout/student-signout-model';
import { StudentSignoutDataService } from '@reslife/student-signout/student-signout-data-access';
import { StudentSignoutModalComponent } from '@reslife/student-signout/student-signout-ui';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'reslife-student-signout-page',
  templateUrl: './student-signout-page.component.html',
  styleUrls: ['./student-signout-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentSignoutPageComponent implements OnInit {
  signouts$!: Observable<StudentSignout[]>
  boarders$!: Observable<BoarderSignoutMeta[]>;
  signoutMeta$!: Observable<BoarderSignoutMeta | null>;
  selectedSignout!: StudentSignout | null; 
  @ViewChild(TemplateRef) dialogTemplate!: TemplateRef<StudentSignoutModalComponent>;
  constructor(private ssd: StudentSignoutDataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.boarders$ = this.ssd.getAvailableBoarders();
    this.signouts$ = this.ssd.getCurrentSignouts();
  }



  newSignout(): void {
    this.selectedSignout = null;
    this.signoutMeta$ = of(null);
    this.dialog.open(this.dialogTemplate).afterClosed().subscribe((newSignout: StudentSignout | null) => {
      if(newSignout){
        this.ssd.addSignout(newSignout);
      }
    })
  }
  
  editSignout(signout: StudentSignout): void {
    this.selectedSignout = signout;
    this.signoutMeta$ = this.ssd.getSignoutMetaById(signout.student.uid);
    this.dialog.open(this.dialogTemplate).afterClosed().subscribe((editedSignout: StudentSignout | null) => {
      if(editedSignout){
        this.ssd.updateSignout(signout);
      }
    })
  }

  signIn(signout: StudentSignout): Promise<void> {
    return this.ssd.signIn(signout);
  }



}
