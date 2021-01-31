import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { TokenObject } from '@shared/interfaces/token-object.interface';
import { UserWithToken } from '@shared/interfaces/user-with-token.interface';
import { User } from '@shared/interfaces/user.interface';
import { AuthRequests } from '@shared/requests/auth.requests';
import { Observable, of } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { CurrentUserActions } from './current-user.actions';

type CurrentStateContext = StateContext<User>;

@State<User>({
  name: 'CurrentUserState',
  defaults: null,
})
@Injectable()
export class CurrentUserState {
  constructor(private readonly authRequests: AuthRequests) {}

  @Action(CurrentUserActions.Cache)
  public cache(
    context: CurrentStateContext,
    actionPayload: CurrentUserActions.Cache
  ): Observable<void> {
    const { user }: CurrentUserActions.Cache = actionPayload;
    context.setState(user);
    return of(VOID);
  }

  @Action(CurrentUserActions.GetCurrentUser)
  public getCurrentUser(
    context: StateContext<UserWithToken>,
    _actionPayload: CurrentUserActions.GetCurrentUser
  ): Observable<void> {
    return this.authRequests.getCurrentUser().pipe(
      tap((user: User) =>
        context.dispatch(new CurrentUserActions.Cache(user))
      ),
      mapTo(VOID)
    );
  }
}
