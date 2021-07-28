import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Boarder } from '@reslife/shared-models';
import { BoarderAction } from '../../boarder-action';
@Component({
  selector: 'reslife-manage-boarders-table',
  templateUrl: './manage-boarders-table.component.html',
  styleUrls: ['./manage-boarders-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageBoardersTableComponent {
  @Input() boarders!: Boarder[] | null;
  @Output() action = new EventEmitter<BoarderAction>();
  displayedColumns = ['name', 'type', 'actions'];

  get _boarders(): Boarder[] {
    return this.boarders ? this.boarders : [];
  }

 

}
