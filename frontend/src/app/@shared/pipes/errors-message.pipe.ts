import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Errors } from '@shared/enums/errors.enum';
import { isEmpty } from '@shared/functions/is-empty.function';
import { isNil } from '@shared/functions/is-nil.function';

@Pipe({ name: 'errorsMessage' })
export class ErrorsMessagePipe implements PipeTransform {
  transform(errors: ValidationErrors): string {
    if (isNil(errors)) {
      return null;
    }
    const errorKeys: string[] = Object.keys(errors);
    if (isEmpty(errorKeys)) {
      return null;
    }
    const errorsMessageList: string[] = errorKeys.map((key: string) =>
      Errors[key] ?? null
    );
    const validErrors: string[] = errorsMessageList.filter(
      (value: string) => !isNil(value)
    );
    return `${validErrors.join(';\n')}.`;
  }
}
