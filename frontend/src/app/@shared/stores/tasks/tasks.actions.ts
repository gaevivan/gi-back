import { Task } from '@shared/interfaces/task.interface';
import { WithId } from '@shared/interfaces/with-field.interface';
import { Uuid } from '@shared/types/uuid.type';

export namespace TasksActions {
  export class Create {
    public static readonly type: string = '[TasksActions] Create';
    constructor(public readonly itemList: Task[]) {}
  }

  export class Cache {
    public static readonly type: string = '[TasksActions] Cache';
    constructor(public readonly itemList: WithId<Task>[]) {}
  }

  export class SelectMany {
    public static readonly type: string = '[TasksActions] SelectMany';
    constructor(public readonly idList: Uuid[]) {}
  }

  export class SelectOne {
    public static readonly type: string = '[TasksActions] SelectOne';
    constructor(public readonly id: Uuid) {}
  }
}
