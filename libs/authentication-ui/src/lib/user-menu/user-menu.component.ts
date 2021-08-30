import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
