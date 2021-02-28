import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class BeforeLoginService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(!this.Token.loggedIn()) {
      return true;
    }
    else {
          this.router.navigateByUrl('products');
          return false;
    }
  }
  constructor(
    private Token: TokenService,
    private router: Router
    ) { }

}
