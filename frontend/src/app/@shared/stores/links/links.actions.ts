import { Link } from '@shared/interfaces/link.interface';
import { WithId } from '@shared/interfaces/with-field.interface';
import { Uuid } from '@shared/types/uuid.type';

export namespace LinksActions {

  export class Create {
    public static readonly type: string = '[LinksActions] Create';
    constructor(public readonly itemList: WithId<Link>[]) {}
  }

  export class Cache {
    public static readonly type: string = '[LinksActions] Cache';
    constructor(public readonly itemList: Link[]) {}
  }

  export class SelectMany {
    public static readonly type: string = '[LinksActions] SelectMany';
    constructor(public readonly idList: Uuid[]) {}
  }

  export class SelectOne {
    public static readonly type: string = '[LinksActions] SelectOne';
    constructor(public readonly id: Uuid) {}
  }
}
