import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { Entities } from '@shared/enums/entity.enum';
import { isEmpty } from '@shared/functions/is-empty.function';
import { Filter } from '@shared/interfaces/filter.interface';
import { User } from '@shared/interfaces/user.interface';
import { RequestBody } from '@shared/namespaces/request-body.namespace';
import { StorageRequests } from '@shared/requests/storage.requests';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersActions } from './users.actions';

type CurrentStateContext = StateContext<User[]>;

@State<User[]>({
  name: 'UsersState',
  defaults: null,
})
@Injectable()
export class UsersState {
  constructor(private readonly storageRequests: StorageRequests) {}

  @Action(UsersActions.Cache)
  public cache(
    context: CurrentStateContext,
    actionPayload: UsersActions.Cache
  ): Observable<void> {
    const { userList }: UsersActions.Cache = actionPayload;
    context.setState(userList);
    return of(VOID);
  }

  @Action(UsersActions.SelectByIdList)
  public select(
    context: CurrentStateContext,
    actionPayload: UsersActions.SelectByIdList
  ): Observable<void> {
    const { idList }: UsersActions.SelectByIdList = actionPayload;
    const equalFilter: Filter[] = idList.map((id: string) => [
      'id',
      '=',
      id,
    ]);
    const body: RequestBody.Select = {
      entity: Entities.users,
      filter: isEmpty(equalFilter) ? equalFilter : ['or', ...equalFilter],
    };
    return this.storageRequests
      .select<User>(body)
      .pipe(
        switchMap((userList: User[]) =>
          context.dispatch(new UsersActions.Cache(userList))
        )
      );
  }
}
