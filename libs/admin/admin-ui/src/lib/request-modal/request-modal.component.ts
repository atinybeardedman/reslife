import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reslife-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
