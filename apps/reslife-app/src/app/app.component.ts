import { Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { NavigationItem } from '@reslife/shared-models';
import { appRoutes } from './routes';
@Component({
  selector: 'reslife-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pageTitle!: string;
  links: NavigationItem[] = appRoutes.slice(1).map(r => ({
    path: r.path || '',
    icon: r.data?.icon || '',
    name: r.data?.name || '',
    roles: r.data?.roles || []
  })); 
  constructor(private router: Router) {
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
