import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { App } from '@shared/interfaces/app.interface';
import { Observable, of } from 'rxjs';
import { CurrentAppActions } from './current-app.actions';

@State<App>({
  name: 'CurrentAppState',
  defaults: null,
})
@Injectable()
export class CurrentAppState {
  @Action(CurrentAppActions.Cache)
  public cache(
    context: StateContext<App>,
    actionPayload: CurrentAppActions.Cache
  ): Observable<void> {
    const { app }: CurrentAppActions.Cache = actionPayload;
    context.setState(app);
    return of(VOID);
  }
}
