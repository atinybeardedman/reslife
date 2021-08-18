import { Component, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'reslife-check-in-based-excusal-form',
  templateUrl: './check-in-based-excusal-form.component.html',
  styleUrls: ['./check-in-based-excusal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckInBasedExcusalFormComponent {
  @Input() checkins!: string[];
  @Output() selectedCheckins = new EventEmitter<string[]>();

  @ViewChild('checkInList') list!: MatSelectionList;
  
  onSelectionChange(): void {
    this.selectedCheckins.emit(this.list.selectedOptions.selected.map(o => o.value));
  }

}
