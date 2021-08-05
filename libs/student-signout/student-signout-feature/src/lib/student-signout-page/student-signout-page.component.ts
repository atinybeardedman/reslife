import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { BoarderSignoutMeta, StudentSignout } from '@reslife/student-signout/student-signout-model';
import { StudentSignoutDataService } from '@reslife/student-signout/student-signout-data-access';
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
  constructor(private ssd: StudentSignoutDataService) { }

  ngOnInit(): void {
    this.boarders$ = this.ssd.getAvailableBoarders();
    this.signouts$ = this.ssd.getCurrentSignouts();
  }



  newSignout(): void {}
  
  editSignout(signout: StudentSignout): void {}

  checkIn(signout: StudentSignout): void {}

  saveSignout(signout: StudentSignout): void {}


}
