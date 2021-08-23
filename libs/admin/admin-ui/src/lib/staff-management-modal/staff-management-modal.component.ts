import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-staff-management-modal',
  templateUrl: './staff-management-modal.component.html',
  styleUrls: ['./staff-management-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffManagementModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
