import { File } from '@shared/interfaces/file.interface';
import { Uuid } from '@shared/types/uuid.type';

export namespace FilesActions {
  export class Cache {
    public static readonly type: string = '[FilesActions] Cache';
    constructor(public readonly itemList: File[]) {}
  }

  export class SelectMany {
    public static readonly type: string = '[FilesActions] SelectMany';
    constructor(public readonly idList: Uuid[]) {}
  }

  export class SelectOne {
    public static readonly type: string = '[FilesActions] SelectOne';
    constructor(public readonly id: Uuid) {}
  }
}
