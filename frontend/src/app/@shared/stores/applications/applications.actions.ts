import { Application } from '@shared/interfaces/app.interface';
import { User } from '@shared/interfaces/user.interface';
import { RequestBody } from '@shared/namespaces/request-body.namespace';
import { Uuid } from '@shared/types/uuid.type';

export namespace ApplicationsActions {
  export class Cache {
    public static readonly type: string = '[ApplicationsActions] Cache';
    constructor(public readonly applicationList: Application[]) {}
  }

  export class Select {
    public static readonly type: string = '[ApplicationsActions] Select';
    constructor(public readonly requestBody: RequestBody.NoEntitySelect) {}
  }
}
