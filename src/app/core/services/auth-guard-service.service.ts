import { MainService } from './main.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanLoad, CanActivate {
  constructor(private mainServ: MainService, private router: Router) {
  }
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // let path = route.url[0]
    if (this.mainServ.loginServ.isLogin()) {
      if (this.mainServ.globalServ.isAllowedPage("user") == false) {
        this.router.navigate(["/login"])
        return false;
      } else {
        return true;

      }
    }

    this.router.navigate(["/login"]);
    return false;

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    let path = route.url[0]

    if (this.mainServ.loginServ.isLogin()) {
      if (this.mainServ.globalServ.isAllowedPage(path) == false) {
        this.router.navigate(["/Permision"])
        return false;
      } else {
        return true;
      }
    }
    else {
      this.router.navigate(["/login"]);
      return false;

    }

  }
} 