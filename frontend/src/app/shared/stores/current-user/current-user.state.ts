import { Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { UserWithToken } from '@shared/interfaces/user-with-token.interface';
import { Observable, of } from 'rxjs';
import { CurrentUserActions } from './current-user.actions';

@State<UserWithToken>({
  name: 'ShortcutsState',
  defaults: null,
})
@Injectable()
export class CurrentUserState {
  @Action(CurrentUserActions.Cache)
  public deletePropertyRelation(
    context: StateContext<UserWithToken>,
    actionPayload: CurrentUserActions.Cache
  ): Observable<void> {
    const { user }: CurrentUserActions.Cache = actionPayload;
    context.setState(user);
    return of(VOID);
  }

  public static getCurrentUser(): (
    currentUser: UserWithToken
  ) => UserWithToken {
    return createSelector([CurrentUserState], (currentUser: UserWithToken) => {
      return currentUser;
    });
  }
}
