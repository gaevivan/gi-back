import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { Entities } from '@shared/enums/entity.enum';
import { isEmpty } from '@shared/functions/is-empty.function';
import { Filter } from '@shared/interfaces/filter.interface';
import { Link } from '@shared/interfaces/link.interface';
import { RequestBody } from '@shared/namespaces/request-body.namespace';
import { StorageRequests } from '@shared/requests/storage.requests';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LinksActions } from './links.actions';

type CurrentType = Link;

@State<CurrentType[]>({
  name: 'LinksState',
  defaults: null,
})
@Injectable()
export class LinksState {
  constructor(private readonly storageRequests: StorageRequests) {}

  @Action(LinksActions.Cache)
  public cache(
    context: StateContext<CurrentType[]>,
    actionPayload: LinksActions.Cache
  ): Observable<void> {
    const { itemList }: LinksActions.Cache = actionPayload;
    context.setState(itemList);
    return of(VOID);
  }

  @Action(LinksActions.SelectMany)
  public select(
    context: StateContext<CurrentType[]>,
    actionPayload: LinksActions.SelectMany
  ): Observable<void> {
    const { idList }: LinksActions.SelectMany = actionPayload;
    const equalFilter: Filter[] = idList.map((id: string) => ['id', '=', id]);
    const body: RequestBody.Select = {
      entity: Entities.links,
      filter: isEmpty(equalFilter) ? equalFilter : ['or', ...equalFilter],
    };
    return this.storageRequests
      .select<CurrentType>(body)
      .pipe(
        switchMap((itemList: CurrentType[]) =>
          context.dispatch(new LinksActions.Cache(itemList))
        )
      );
  }
}
