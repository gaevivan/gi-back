import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { isNil } from '@shared/functions/is-nil.function';
import { TokenObject } from '@shared/interfaces/token-object.interface';
import { AuthState } from '@shared/stores/auth/auth.state';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CanActiveService implements CanActivate {
  private readonly token$: Observable<TokenObject> = this.store.select(
    AuthState
  );

  constructor(private readonly store: Store, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.token$.pipe(take(1)).pipe(
      map((tokenObject: TokenObject) => {
        const isAuthorized: boolean = !isNil(tokenObject);
        const isAuthPages: boolean =
          state.url === '/sign-in' || state.url === '/sign-up';

        if (isAuthPages && isAuthorized) {
          this.router.navigate(['/']);
          return false;
        }

        if (isAuthPages && !isAuthorized) {
          return true;
        }
        if (!isAuthorized) {
          this.router.navigateByUrl('/sign-in');
        }

        return isAuthorized;
      })
    );
  }
}
