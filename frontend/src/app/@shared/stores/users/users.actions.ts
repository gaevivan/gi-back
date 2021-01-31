import { User } from '@shared/interfaces/user.interface';
import { Uuid } from '@shared/types/uuid.type';

export namespace UsersActions {
  export class Cache {
    public static readonly type: string = '[UsersActions] Cache';
    constructor(public readonly userList: User[]) {}
  }

  export class SelectByIdList {
    public static readonly type: string = '[UsersActions] SelectByIdList';
    constructor(public readonly idList: Uuid[]) {}
  }
}
