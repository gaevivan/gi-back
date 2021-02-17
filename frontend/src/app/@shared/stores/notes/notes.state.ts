import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { VOID } from '@shared/constants/void.constant';
import { Entities } from '@shared/enums/entity.enum';
import { isEmpty } from '@shared/functions/is-empty.function';
import { Filter } from '@shared/interfaces/filter.interface';
import { Note } from '@shared/interfaces/note.interface';
import { WithId } from '@shared/interfaces/with-field.interface';
import { RequestBody } from '@shared/namespaces/request-body.namespace';
import { StorageRequests } from '@shared/requests/storage.requests';
import { Uuid } from '@shared/types/uuid.type';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NotesActions } from './notes.actions';

type CurrentType = Note;

@State<CurrentType[]>({
  name: 'NotesState',
  defaults: null,
})
@Injectable()
export class NotesState {
  constructor(private readonly storageRequests: StorageRequests) {}

  @Action(NotesActions.Cache)
  public cache(
    context: StateContext<CurrentType[]>,
    actionPayload: NotesActions.Cache
  ): Observable<void> {
    const { itemList }: NotesActions.Cache = actionPayload;
    context.setState(itemList);
    return of(VOID);
  }

  @Action(NotesActions.Create)
  public create(
    context: StateContext<CurrentType[]>,
    actionPayload: NotesActions.Create
  ): Observable<void> {
    const { itemList }: NotesActions.Create = actionPayload;
    const body: RequestBody.Create<CurrentType> = {
      entity: Entities.notes,
      data: itemList
    };
    return this.storageRequests.create<CurrentType>(body).pipe(
      switchMap((idList: Uuid[]) => context.dispatch(new NotesActions.SelectMany(idList)))
    );
  }

  @Action(NotesActions.SelectMany)
  public select(
    context: StateContext<CurrentType[]>,
    actionPayload: NotesActions.SelectMany
  ): Observable<void> {
    const { idList }: NotesActions.SelectMany = actionPayload;
    const equalFilter: Filter[] = idList.map((id: string) => ['id', '=', id]);
    const body: RequestBody.Select = {
      entity: Entities.notes,
      filter: isEmpty(equalFilter) ? equalFilter : ['or', ...equalFilter],
    };
    return this.storageRequests
      .select<WithId<CurrentType>>(body)
      .pipe(
        switchMap((itemList: WithId<CurrentType>[]) =>
          context.dispatch(new NotesActions.Cache(itemList))
        )
      );
  }
}
