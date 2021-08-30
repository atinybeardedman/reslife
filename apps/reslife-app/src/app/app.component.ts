import { Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { NavigationItem, Role } from '@reslife/shared-models';
import { AuthenticationService } from '@reslife/authentication';
import { appRoutes } from './routes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StaffMember } from '@reslife/admin-model';
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
  user$: Observable<StaffMember | null>;
  constructor(private router: Router, private auth: AuthenticationService) {
    this.roles$ = this.auth.getUser().pipe(
      map((user) => {
        if(user){
          return user.roles
        }
        return []
      })
    );
    this.user$ = this.auth.getUser();
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

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('login');
  }
}
