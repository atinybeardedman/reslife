import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
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
  selectedSignout!: StudentSignout | null; 
  @ViewChild(TemplateRef) dialogTemplate!: TemplateRef<StudentSignoutModalComponent>;
  constructor(private ssd: StudentSignoutDataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.boarders$ = this.ssd.getAvailableBoarders();
    this.signouts$ = this.ssd.getCurrentSignouts();
  }



  newSignout(): void {
    this.selectedSignout = null;
    this.dialog.open(this.dialogTemplate)
  }
  
  editSignout(signout: StudentSignout): void {
    this.selectedSignout = signout;
    this.dialog.open(this.dialogTemplate)
  }

  signIn(signout: StudentSignout): Promise<void> {
    return this.ssd.signIn(signout);
  }

  saveSignout(signout: StudentSignout): Promise<void> {
    return this.ssd.saveSignout(signout);
  }


}
