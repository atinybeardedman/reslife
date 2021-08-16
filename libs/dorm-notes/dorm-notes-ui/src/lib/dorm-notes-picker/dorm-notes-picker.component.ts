import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-dorm-notes-picker',
  templateUrl: './dorm-notes-picker.component.html',
  styleUrls: ['./dorm-notes-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DormNotesPickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
