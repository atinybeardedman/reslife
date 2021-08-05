import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-student-signout-modal',
  templateUrl: './student-signout-modal.component.html',
  styleUrls: ['./student-signout-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentSignoutModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
