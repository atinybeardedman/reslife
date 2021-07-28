import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Boarder } from '@reslife/shared-models';
import { Observable } from 'rxjs';
import { BoarderManagementService } from '@reslife/admin-data-access';

@Component({
  selector: 'reslife-boarder-management-page',
  templateUrl: './boarder-management-page.component.html',
  styleUrls: ['./boarder-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoarderManagementPageComponent implements OnInit {
  boarders$!: Observable<Boarder[]>;

  constructor(private bs: BoarderManagementService){}

  ngOnInit(): void {
    this.boarders$ = this.bs.getActiveBoarders();
  }

}
