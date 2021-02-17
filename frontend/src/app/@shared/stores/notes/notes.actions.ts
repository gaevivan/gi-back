import { Note } from '@shared/interfaces/note.interface';
import { Uuid } from '@shared/types/uuid.type';

export namespace NotesActions {
  export class Cache {
    public static readonly type: string = '[NotesActions] Cache';
    constructor(public readonly itemList: Note[]) {}
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
