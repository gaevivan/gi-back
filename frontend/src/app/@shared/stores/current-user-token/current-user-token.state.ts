import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { Uuid } from '@shared/types/uuid.type';
import { Observable, of } from 'rxjs';
import { CurrentUserTokenActions } from './current-user-token.actions';

@State<Uuid>({
  name: 'CurrentUserTokenState',
  defaults: null,
})
@Injectable()
export class CurrentUserTokenState {
  @Action(CurrentUserTokenActions.Cache)
  public cache(
    context: StateContext<Uuid>,
    actionPayload: CurrentUserTokenActions.Cache
  ): Observable<void> {
    const { token }: CurrentUserTokenActions.Cache = actionPayload;
    context.setState(token);
    return of(VOID);
  }
}
