export namespace FilterNamespace {
  export type Filter = CompareFilter | CombineFilter | NegationFilter;

  export type CombineFilter = [CombineOperation, ...Filter[]];
  
  export type NegationFilter = [NotOperation, CompareFilter];
  export type CompareFilter = String.CompareFilter | Number.CompareFilter | Boolean.CompareFilter;

  export type Key = string;

  export type CombineOperation = 'and' | 'or';
  export type NotOperation = 'not';
  export type CommonOperation = '=' | '!=' | '<>';

  namespace String {
    export type Operation = 'startsWith' | 'endsWith' | 'contains';
    export type CompareFilter = [Key, Operation | CommonOperation, string];
  }
  namespace Number {
    export type Operation = '>' | '<';
    export type CompareFilter = [Key, Operation | CommonOperation, number];
  }
  namespace Boolean {
    export type CompareFilter = [Key, CommonOperation, boolean];
  }
}
