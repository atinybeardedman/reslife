import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationItem, Role } from '@reslife/shared-models';

@Component({
  selector: 'reslife-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {
  @Input() links: NavigationItem[] = [];
  @Input() role: Role = 'any'; 

  get renderedLinks(): NavigationItem[] {
    return this.links.filter(l => {
      if(!l.roles){
        return true
      } else {
        return l.roles.length === 0 || l.roles.includes(this.role);
      }
    })
  }

}
