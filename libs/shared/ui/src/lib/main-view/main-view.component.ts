import { Component,ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'reslife-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainViewComponent {
  @Input() title!: string;
  @Input() pageTitle!: string;
}
