import { AuthInfo } from '@shared/interfaces/auth-info.interface';
import { UserWithToken } from '@shared/interfaces/user-with-token.interface';
import { Uuid } from '@shared/types/uuid.type';

export namespace CurrentUserActions {
  export class Cache {
    public static readonly type: string = '[CurrentUserActions] Cache';
    constructor(public readonly user: UserWithToken) {}
  }

  export class SignIn {
    public static readonly type: string = '[CurrentUserActions] SignIn';
    constructor(public readonly authInfo: AuthInfo) {}
  }

  export class SignUp {
    public static readonly type: string = '[CurrentUserActions] SignUp';
    constructor(public readonly authInfo: AuthInfo) {}
  }

  export class SignOut {
    public static readonly type: string = '[CurrentUserActions] SignOut';
    constructor(public readonly token: Uuid) {}
  }
}
