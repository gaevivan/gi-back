import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { Entities } from '@shared/enums/entity.enum';
import { isEmpty } from '@shared/functions/is-empty.function';
import { Filter } from '@shared/interfaces/filter.interface';
import { Link } from '@shared/interfaces/link.interface';
import { WithId } from '@shared/interfaces/with-field.interface';
import { RequestBody } from '@shared/namespaces/request-body.namespace';
import { StorageRequests } from '@shared/requests/storage.requests';
import { Uuid } from '@shared/types/uuid.type';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LinksActions } from './links.actions';

type CurrentType = Link;

@State<CurrentType[]>({
  name: 'LinksState',
  defaults: [
    {
      name: 'yandex',
      url: 'http://yandex.ru'
    }, {
      name: 'google1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
      url: 'https://www.google.com'
    }, {
      name: 'kg',
      url: 'kg-portal.ru'
    }, {
      name: 'kinopoisk',
      url: 'kinopoisk.ru'
    }
  ],
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

  @Action(LinksActions.Create)
  public create(
    context: StateContext<CurrentType[]>,
    actionPayload: LinksActions.Create
  ): Observable<void> {
    const { itemList }: LinksActions.Create = actionPayload;
    const body: RequestBody.Create<CurrentType> = {
      entity: Entities.links,
      data: itemList
    };
    return this.storageRequests.create<CurrentType>(body).pipe(
      switchMap((idList: Uuid[]) => context.dispatch(new LinksActions.SelectMany(idList)))
    );
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
      .select<WithId<CurrentType>>(body)
      .pipe(
        switchMap((itemList: WithId<CurrentType>[]) =>
          context.dispatch(new LinksActions.Cache(itemList))
        )
      );
  }
}
