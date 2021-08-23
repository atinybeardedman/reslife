import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-dorm-management-modal',
  templateUrl: './dorm-management-modal.component.html',
  styleUrls: ['./dorm-management-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DormManagementModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
