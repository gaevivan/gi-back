import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { Application } from '@shared/interfaces/app.interface';
import { Observable, of } from 'rxjs';
import { CurrentAppActions } from './current-app.actions';

@State<Application>({
  name: 'CurrentAppState',
  defaults: null,
})
@Injectable()
export class CurrentAppState {
  @Action(CurrentAppActions.Cache)
  public cache(
    context: StateContext<Application>,
    actionPayload: CurrentAppActions.Cache
  ): Observable<void> {
    const { app }: CurrentAppActions.Cache = actionPayload;
    context.setState(app);
    return of(VOID);
  }
}
