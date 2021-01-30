import { Uuid } from '@shared/types/uuid.type';

export namespace CurrentUserTokenActions {
  export class Cache {
    public static readonly type: string = '[CurrentUserTokenActions] Cache';
    constructor(public readonly token: Uuid) {}
  }
}
