import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { isNil } from '@shared/functions/is-nil.function';
import { User } from '@shared/interfaces/user.interface';
import { filterNil } from '@shared/rxjs-operators/filter-not-nil.operator';
import { AuthActions } from '@shared/stores/auth/auth.actions';
import { CurrentUserActions } from '@shared/stores/current-user/current-user.actions';
import { CurrentUserState } from '@shared/stores/current-user/current-user.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss'],
})
export class NavigationHeaderComponent {
  public currentUser$: Observable<User> = this.store.select(CurrentUserState);
  public currentUserLogin$: Observable<string> = this.currentUser$.pipe(
    filterNil(),
    map((user: User) => user.login)
  );

  constructor(private readonly store: Store, private readonly router: Router) {}

  public ngOnInit(): void {
    const currentUser: User = this.store.selectSnapshot(CurrentUserState);
    if (isNil(currentUser)) {
      this.store.dispatch(new CurrentUserActions.GetCurrentUser());
    }
  }

  public signOut(): void {
    this.store
      .dispatch(new AuthActions.SignOut())
      .subscribe(() => this.router.navigateByUrl('/sign-in'));
  }
}
