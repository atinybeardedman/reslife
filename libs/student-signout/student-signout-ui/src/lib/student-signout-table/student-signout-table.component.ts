import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-student-signout-table',
  templateUrl: './student-signout-table.component.html',
  styleUrls: ['./student-signout-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentSignoutTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
