import { User } from '@shared/interfaces/user.interface';

export namespace CurrentUserActions {
  export class Cache {
    public static readonly type: string = '[CurrentUserActions] Cache';
    constructor(public readonly user: User) {}
  }

  export class GetCurrentUser {
    public static readonly type: string = '[CurrentUserActions] GetCurrentUser';
  }
}
