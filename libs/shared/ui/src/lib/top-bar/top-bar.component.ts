import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'reslife-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  @Input() title!: string;

}
