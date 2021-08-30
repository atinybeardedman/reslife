import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationItem, Role } from '@reslife/shared-models';

@Component({
  selector: 'reslife-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {
  @Input() links: NavigationItem[] = [];
  @Input() roles: Role[] | null = ['any'];
  @Output() navigationClick = new EventEmitter<NavigationItem>(); 

  get renderedLinks(): NavigationItem[] {
    return this.links.filter(l => {
      if(!l.roles){
        return true
      } else {
        if(l.roles.length === 0){
          return true
        }
        if(this.roles){
          for(const role of this.roles){
            if (l.roles.includes(role)){
              return true
            }
          }
        }
        return false;
      }
    })
  }

}
