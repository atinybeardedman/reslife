import { Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { appRoutes } from './routes';
@Component({
  selector: 'reslife-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pageTitle!: string;
  constructor(private router: Router){
    
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        const url = event.url.split('/')[1];
        const route = appRoutes.find(r => r.path === url);
        console.log()
        if(route?.data?.pageTitle){
          this.pageTitle = route.data.pageTitle;
        }

      }
    });
  }

}
