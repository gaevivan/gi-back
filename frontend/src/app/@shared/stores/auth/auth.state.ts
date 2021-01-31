import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { TokenObject } from '@shared/interfaces/token-object.interface';
import { UserWithToken } from '@shared/interfaces/user-with-token.interface';
import { AuthRequests } from '@shared/requests/auth.requests';
import { combineLatest, Observable, of } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { CurrentUserActions } from '../current-user/current-user.actions';
import { AuthActions } from './auth.actions';

type CurrentStateContext = StateContext<TokenObject>;

@State<TokenObject>({
  name: 'AuthState',
  defaults: null,
})
@Injectable()
export class AuthState {
  constructor(private readonly authRequests: AuthRequests) {}

  @Action(AuthActions.CacheToken)
  public cacheToken(
    context: CurrentStateContext,
    actionPayload: AuthActions.CacheToken
  ): Observable<void> {
    const { token }: AuthActions.CacheToken = actionPayload;
    context.setState(token);
    return of(VOID);
  }

  @Action(AuthActions.SignIn)
  public signIn(
    context: StateContext<UserWithToken>,
    actionPayload: AuthActions.SignIn
  ): Observable<void> {
    const { authInfo }: AuthActions.SignIn = actionPayload;
    context.dispatch(new CurrentUserActions.Cache(null));
    return this.authRequests.signIn(authInfo).pipe(
      tap((token: TokenObject) =>
        context.dispatch(new AuthActions.CacheToken(token))
      ),
      mapTo(VOID)
    );
  }

  @Action(AuthActions.SignUp)
  public signUp(
    context: StateContext<UserWithToken>,
    actionPayload: AuthActions.SignUp
  ): Observable<void> {
    const { authInfo }: AuthActions.SignUp = actionPayload;
    context.dispatch(new CurrentUserActions.Cache(null));
    return this.authRequests.signUp(authInfo).pipe(
      tap((token: TokenObject) =>
        context.dispatch(new AuthActions.CacheToken(token))
      ),
      mapTo(VOID)
    );
  }

  @Action(AuthActions.SignOut)
  public signOut(
    context: StateContext<UserWithToken>,
    _actionPayload: AuthActions.SignOut
  ): Observable<void> {
    return combineLatest([
      this.authRequests.signOut(),
      context.dispatch(new AuthActions.CacheToken(null)),
      context.dispatch(new CurrentUserActions.Cache(null)),
    ]).pipe(mapTo(VOID));
  }
}
