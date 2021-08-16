import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-dorm-notes-form',
  templateUrl: './dorm-notes-form.component.html',
  styleUrls: ['./dorm-notes-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DormNotesFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
