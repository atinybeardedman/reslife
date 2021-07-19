import {
  Component,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { CheckInItem } from '@reslife/data';

@Component({
  selector: 'reslife-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistComponent implements OnChanges {
  @Input() type: 'To-Check' | 'Checked In' = 'To-Check';
  @Input() items: CheckInItem[] = [];
  @Output() checked = new EventEmitter<CheckInItem>();
  public icon = 'check';
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type.currentValue && !changes.type.isFirstChange) {
      this.icon = this.type === 'To-Check' ? 'check' : 'undo';
    }
  }
}
