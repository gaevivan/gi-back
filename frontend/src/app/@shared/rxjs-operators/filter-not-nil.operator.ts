import { isNil } from '@shared/functions/is-nil.function';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export function filterNil(type: 'nil' | 'notNil' = 'notNil') {
  const isNilType: boolean = type === 'nil';
  return function <T>(source: Observable<T>) {
    return source.pipe(
      filter((value: unknown) => (isNilType ? isNil(value) : !isNil(value)))
    );
  };
}
