import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Item } from '@reslife/data';

@Component({
  selector: 'reslife-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecklistItemComponent {
  @Input() icon!: string;
  @Input() item!: Item; 
  @Output() action = new EventEmitter<Item>();

}
