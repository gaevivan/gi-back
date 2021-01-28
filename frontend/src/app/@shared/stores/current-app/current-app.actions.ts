import { App } from '@shared/interfaces/app.interface';

export namespace CurrentAppActions {
  export class Cache {
    public static readonly type: string = '[CurrentAppActions] Cache';
    constructor(public readonly app: App) {}
  }
}
