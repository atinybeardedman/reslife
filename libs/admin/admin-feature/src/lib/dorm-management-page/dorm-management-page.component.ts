import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-dorm-management-page',
  templateUrl: './dorm-management-page.component.html',
  styleUrls: ['./dorm-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DormManagementPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
