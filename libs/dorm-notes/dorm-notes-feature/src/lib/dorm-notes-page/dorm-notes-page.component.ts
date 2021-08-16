import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-dorm-notes-page',
  templateUrl: './dorm-notes-page.component.html',
  styleUrls: ['./dorm-notes-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DormNotesPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
