import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-aod-signouts-page',
  templateUrl: './aod-signouts-page.component.html',
  styleUrls: ['./aod-signouts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AodSignoutsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
