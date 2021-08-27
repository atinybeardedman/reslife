import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-process-requests-page',
  templateUrl: './process-requests-page.component.html',
  styleUrls: ['./process-requests-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcessRequestsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
