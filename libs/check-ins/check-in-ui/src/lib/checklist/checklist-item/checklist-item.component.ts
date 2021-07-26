import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { CheckInItem } from '@reslife/check-ins/check-in-model';

@Component({
  selector: 'reslife-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecklistItemComponent {
  @Input() icon!: string;
  @Input() item!: CheckInItem; 
  @Output() action = new EventEmitter<CheckInItem>();

}
