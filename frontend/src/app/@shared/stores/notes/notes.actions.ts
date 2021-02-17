import { Note } from '@shared/interfaces/note.interface';
import { WithId } from '@shared/interfaces/with-field.interface';
import { Uuid } from '@shared/types/uuid.type';

export namespace NotesActions {
  export class Create {
    public static readonly type: string = '[NotesActions] Create';
    constructor(public readonly itemList: Note[]) {}
  }

  export class Cache {
    public static readonly type: string = '[NotesActions] Cache';
    constructor(public readonly itemList: WithId<Note>[]) {}
  }

  export class SelectMany {
    public static readonly type: string = '[NotesActions] SelectMany';
    constructor(public readonly idList: Uuid[]) {}
  }

  export class SelectOne {
    public static readonly type: string = '[NotesActions] SelectOne';
    constructor(public readonly id: Uuid) {}
  }
}
