import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecklistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
