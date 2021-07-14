import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecklistItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
