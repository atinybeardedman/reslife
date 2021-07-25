import {
  Component,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { CheckInItem, CheckInRecord, ChecklistType } from '@reslife/check-ins/check-in-model';
import { NamedItem } from '@reslife/shared-models';

@Component({
  selector: 'reslife-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistComponent implements OnChanges {
  @Input() type: ChecklistType = 'To Check';
  @Input() items!: CheckInItem[] | null;
  @Output() checked = new EventEmitter<CheckInItem | CheckInRecord>();
  public icon = 'check';
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.type){
      if (changes.type.currentValue) {
        switch(this.type){
          case 'To Check':
            this.icon = 'check';
            break;
          case 'Checked In':
            this.icon = 'undo';
            break;
          case 'Excused':
            this.icon = 'info'
        }
      }
    }
  }

  onSelected(item: NamedItem){
    this.checked.emit(<CheckInItem>item);
  }
}
