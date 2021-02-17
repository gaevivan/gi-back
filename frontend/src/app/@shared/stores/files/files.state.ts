import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { Entities } from '@shared/enums/entity.enum';
import { isEmpty } from '@shared/functions/is-empty.function';
import { File } from '@shared/interfaces/file.interface';
import { Filter } from '@shared/interfaces/filter.interface';
import { WithId } from '@shared/interfaces/with-field.interface';
import { RequestBody } from '@shared/namespaces/request-body.namespace';
import { StorageRequests } from '@shared/requests/storage.requests';
import { Uuid } from '@shared/types/uuid.type';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FilesActions } from './files.actions';

type CurrentType = File;

@State<CurrentType[]>({
  name: 'FilesState',
  defaults: null,
})
@Injectable()
export class FilesState {
  constructor(private readonly storageRequests: StorageRequests) {}

  @Action(FilesActions.Cache)
  public cache(
    context: StateContext<CurrentType[]>,
    actionPayload: FilesActions.Cache
  ): Observable<void> {
    const { itemList }: FilesActions.Cache = actionPayload;
    context.setState(itemList);
    return of(VOID);
  }

  @Action(FilesActions.Create)
  public create(
    context: StateContext<CurrentType[]>,
    actionPayload: FilesActions.Create
  ): Observable<void> {
    const { itemList }: FilesActions.Create = actionPayload;
    const body: RequestBody.Create<CurrentType> = {
      entity: Entities.files,
      data: itemList
    };
    return this.storageRequests.create<CurrentType>(body).pipe(
      switchMap((idList: Uuid[]) => context.dispatch(new FilesActions.SelectMany(idList)))
    );
  }

  @Action(FilesActions.SelectOne)
  public selectOne(
    context: StateContext<CurrentType[]>,
    actionPayload: FilesActions.SelectOne
  ): Observable<void> {
    const { id }: FilesActions.SelectOne = actionPayload;
    const filter: Filter = ['id', '=', id];
    const body: RequestBody.Select = {
      entity: Entities.files,
      filter,
    };
    return this.storageRequests
      .select<WithId<CurrentType>>(body)
      .pipe(
        switchMap((itemList: WithId<CurrentType>[]) =>
          context.dispatch(new FilesActions.Cache(itemList))
        )
      );
  }

  @Action(FilesActions.SelectMany)
  public selectMany(
    context: StateContext<CurrentType[]>,
    actionPayload: FilesActions.SelectMany
  ): Observable<void> {
    const { idList }: FilesActions.SelectMany = actionPayload;
    const equalFilter: Filter[] = idList.map((id: string) => ['id', '=', id]);
    const body: RequestBody.Select = {
      entity: Entities.files,
      filter: isEmpty(equalFilter) ? equalFilter : ['or', ...equalFilter],
    };
    return this.storageRequests
      .select<WithId<CurrentType>>(body)
      .pipe(
        switchMap((itemList: WithId<CurrentType>[]) =>
          context.dispatch(new FilesActions.Cache(itemList))
        )
      );
  }
}
