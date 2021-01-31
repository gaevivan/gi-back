import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { Entities } from '@shared/enums/entity.enum';
import { Application } from '@shared/interfaces/app.interface';
import { StorageRequests } from '@shared/requests/storage.requests';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApplicationsActions } from './applications.actions';

type CurrentStateContext = StateContext<Application[]>;

@State<Application[]>({
  name: 'ApplicationsState',
  defaults: null,
})
@Injectable()
export class ApplicationsState {
  constructor(private readonly storageRequests: StorageRequests) {}

  @Action(ApplicationsActions.Cache)
  public cache(
    context: CurrentStateContext,
    actionPayload: ApplicationsActions.Cache
  ): Observable<void> {
    const { applicationList }: ApplicationsActions.Cache = actionPayload;
    context.setState(applicationList);
    return of(VOID);
  }

  @Action(ApplicationsActions.Select)
  public select(
    context: CurrentStateContext,
    actionPayload: ApplicationsActions.Select
  ): Observable<void> {
    const { requestBody }: ApplicationsActions.Select = actionPayload;
    return this.storageRequests
      .select<Application>({...requestBody, entity: Entities.applications})
      .pipe(
        switchMap((applicationList: Application[]) =>
          context.dispatch(new ApplicationsActions.Cache(applicationList))
        )
      );
  }
}
