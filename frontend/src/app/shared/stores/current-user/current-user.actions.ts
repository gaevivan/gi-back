import { UserWithToken } from '@shared/interfaces/user-with-token.interface';

export namespace CurrentUserActions {
  export class Cache {
    public static readonly type: string = '[CurrentUserActions] Cache';
    constructor(public readonly user: UserWithToken) {}
  }
}
