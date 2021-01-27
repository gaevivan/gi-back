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
import { UserWithToken } from '@shared/interfaces/user-with-token.interface';
import { CurrentUserState } from '@shared/stores/current-user/current-user.state';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CanActiveService implements CanActivate {
  private readonly currentUser$: Observable<UserWithToken> = this.store.select(
    CurrentUserState.getCurrentUser()
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
    return this.currentUser$.pipe(take(1)).pipe(
      map((currentUser: UserWithToken) => {
        const isAuthtorized: boolean = !isNil(currentUser);
        const isAuthPages: boolean =
          state.url === '/sign-in' || state.url === '/sign-up';

        if (isAuthPages && isAuthtorized) {
          this.router.navigate(['/']);
          return false;
        }

        if (isAuthPages && !isAuthtorized) {
          return true;
        }
        if (!isAuthtorized) {
          this.router.navigateByUrl('/sign-in');
        }

        return isAuthtorized;
      })
    );
  }
}
