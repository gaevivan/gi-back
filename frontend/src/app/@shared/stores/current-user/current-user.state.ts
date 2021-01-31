import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { UserWithToken } from '@shared/interfaces/user-with-token.interface';
import { AuthRequests } from '@shared/requests/auth.requests';
import { Observable, of } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { CurrentUserTokenActions } from '../current-user-token/current-user-token.actions';
import { CurrentUserActions } from './current-user.actions';

@State<UserWithToken>({
  name: 'CurrentUserState',
  defaults: null,
})
@Injectable()
export class CurrentUserState {
  constructor(private readonly authRequests: AuthRequests) {}

  @Action(CurrentUserActions.Cache)
  public cache(
    context: StateContext<UserWithToken>,
    actionPayload: CurrentUserActions.Cache
  ): Observable<void> {
    const { user }: CurrentUserActions.Cache = actionPayload;
    context.setState(user);
    return context.dispatch(new CurrentUserTokenActions.Cache(user?.token ?? null));
  }

  @Action(CurrentUserActions.SignIn)
  public signIn(
    context: StateContext<UserWithToken>,
    actionPayload: CurrentUserActions.SignIn
  ): Observable<void> {
    const { authInfo }: CurrentUserActions.SignIn = actionPayload;
    return this.authRequests.signIn(authInfo).pipe(
      tap((userWithToken: UserWithToken) => context.dispatch(new CurrentUserActions.Cache(userWithToken))),
      mapTo(VOID)
    );
  }

  @Action(CurrentUserActions.SignUp)
  public signUp(
    context: StateContext<UserWithToken>,
    actionPayload: CurrentUserActions.SignUp
  ): Observable<void> {
    const { authInfo }: CurrentUserActions.SignUp = actionPayload;
    return this.authRequests.signUp(authInfo).pipe(
      tap((userWithToken: UserWithToken) => context.dispatch(new CurrentUserActions.Cache(userWithToken))),
      mapTo(VOID)
    );
  }

  @Action(CurrentUserActions.SignOut)
  public signOut(
    context: StateContext<UserWithToken>,
    actionPayload: CurrentUserActions.SignOut
  ): Observable<void> {
    const { token }: CurrentUserActions.SignOut = actionPayload;
    return this.authRequests
      .signOut(token)
      .pipe(tap(() => context.setState(null)));
  }
}
