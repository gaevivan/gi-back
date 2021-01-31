import { Sign } from '@shared/interfaces/sign.interface';
import { TokenObject } from '@shared/interfaces/token-object.interface';

export namespace AuthActions {
  export class CacheToken {
    public static readonly type: string = '[AuthActions] Cache';
    constructor(public readonly token: TokenObject) {}
  }

  export class SignIn {
    public static readonly type: string = '[AuthActions] SignIn';
    constructor(public readonly authInfo: Sign) {}
  }

  export class SignUp {
    public static readonly type: string = '[AuthActions] SignUp';
    constructor(public readonly authInfo: Sign) {}
  }

  export class SignOut {
    public static readonly type: string = '[AuthActions] SignOut';
  }
}
