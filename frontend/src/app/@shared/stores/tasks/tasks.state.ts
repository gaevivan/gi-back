import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { Entities } from '@shared/enums/entity.enum';
import { isEmpty } from '@shared/functions/is-empty.function';
import { Filter } from '@shared/interfaces/filter.interface';
import { Task } from '@shared/interfaces/task.interface';
import { RequestBody } from '@shared/namespaces/request-body.namespace';
import { StorageRequests } from '@shared/requests/storage.requests';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TasksActions } from './tasks.actions';

type CurrentType = Task;

@State<CurrentType[]>({
  name: 'TasksState',
  defaults: null,
})
@Injectable()
export class TasksState {
  constructor(private readonly storageRequests: StorageRequests) {}

  @Action(TasksActions.Cache)
  public cache(
    context: StateContext<CurrentType[]>,
    actionPayload: TasksActions.Cache
  ): Observable<void> {
    const { itemList }: TasksActions.Cache = actionPayload;
    context.setState(itemList);
    return of(VOID);
  }

  @Action(TasksActions.SelectMany)
  public select(
    context: StateContext<CurrentType[]>,
    actionPayload: TasksActions.SelectMany
  ): Observable<void> {
    const { idList }: TasksActions.SelectMany = actionPayload;
    const equalFilter: Filter[] = idList.map((id: string) => [
      'id',
      '=',
      id,
    ]);
    const body: RequestBody.Select = {
      entity: Entities.tasks,
      filter: isEmpty(equalFilter) ? equalFilter : ['or', ...equalFilter],
    };
    return this.storageRequests
      .select<CurrentType>(body)
      .pipe(
        switchMap((itemList: CurrentType[]) =>
          context.dispatch(new TasksActions.Cache(itemList))
        )
      );
  }
}
