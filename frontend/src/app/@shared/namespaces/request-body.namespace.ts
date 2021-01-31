import { Entities } from '@shared/enums/entity.enum';
import { Filter } from '@shared/interfaces/filter.interface';

export namespace RequestBody {

  export interface Select {
    entity: Entities;
    filter?: Filter;
    fields?: string[];
    limit?: number;
    offset?: number;
    expand?: number;
  }

  export interface Create<T> {
    entity: Entities;
    data: T[];
  }

  export interface Update<T> {
    entity: Entities;
    filter?: Filter;
    data: Partial<T>;
  }

  export interface Delete {
    entity: Entities;
    filter?: Filter;
  }

  export interface Entity {
    entity: Entities;
  }

}
