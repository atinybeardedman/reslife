import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Role } from '@reslife/shared-models';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from '@reslife/auth-data-access';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.getUser().pipe(
      take(1),
      map(user => {
        if(user){
          return this.hasRole(user.roles, route.data.roles);
        } 
        return false
      })
    ).toPromise();
  }


  hasRole(userRoles: Role[], routeRoles: Role[]): boolean | UrlTree {
    if(routeRoles.length === 0){
      return true
    } else {
      for(const role of routeRoles){
        if(userRoles.includes(role)){
          return true
        }
      }
      return this.router.parseUrl('/');
    }
  }
  
}
