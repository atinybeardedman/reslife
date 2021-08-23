import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-staff-management-page',
  templateUrl: './staff-management-page.component.html',
  styleUrls: ['./staff-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffManagementPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
