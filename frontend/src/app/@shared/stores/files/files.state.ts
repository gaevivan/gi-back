import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { Entities } from '@shared/enums/entity.enum';
import { isEmpty } from '@shared/functions/is-empty.function';
import { File } from '@shared/interfaces/file.interface';
import { Filter } from '@shared/interfaces/filter.interface';
import { RequestBody } from '@shared/namespaces/request-body.namespace';
import { StorageRequests } from '@shared/requests/storage.requests';
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

  @Action(FilesActions.SelectMany)
  public select(
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
      .select<CurrentType>(body)
      .pipe(
        switchMap((itemList: CurrentType[]) =>
          context.dispatch(new FilesActions.Cache(itemList))
        )
      );
  }
}
