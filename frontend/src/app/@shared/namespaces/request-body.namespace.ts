import { Entities } from '@shared/enums/entity.enum';
import { Filter } from '@shared/interfaces/filter.interface';

export namespace RequestBody {

  export interface NoEntitySelect {
    filter?: Filter;
    fields?: string[];
    limit?: number;
    offset?: number;
    expand?: number;
  }

  export interface Select extends NoEntitySelect, Entity {}

  export interface Create<T> extends Entity {
    data: T[];
  }

  export interface Update<T> extends Entity {
    filter?: Filter;
    data: Partial<T>;
  }

  export interface Delete extends Entity {
    filter?: Filter;
  }

  export interface Entity {
    entity: Entities;
  }

}
