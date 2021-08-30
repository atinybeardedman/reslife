import { Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { NavigationItem, Role } from '@reslife/shared-models';
import { AuthenticationService } from '@reslife/authentication';
import { appRoutes } from './routes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'reslife-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pageTitle!: string;
  links: NavigationItem[] = appRoutes.filter(r => r.data?.menuItem).map(r => ({
    path: r.path || '',
    icon: r.data?.icon || '',
    name: r.data?.name || '',
    roles: r.data?.roles || []
  })); 
  roles$: Observable<Role[]>;
  constructor(private router: Router, private auth: AuthenticationService) {
    this.roles$ = this.auth.getUser().pipe(
      map((user) => {
        if(user){
          return user.roles
        }
        return []
      })
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url.split('/')[1];
        const route = appRoutes.find((r) => r.path === url);
        if (route?.data?.name) {
          this.pageTitle = route.data.name;
        }
      }
    });
  }
}
