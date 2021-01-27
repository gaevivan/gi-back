import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
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
      getValidationError(key)
    );
    const validErrors: string[] = errorsMessageList.filter(
      (value: string) => !isNil(value)
    );
    return `${validErrors.join(';\n')}.`;
  }
}

const ERROR_MAP: Map<string, string> = new Map([
  [
    'wrongVerificationPassword',
    'Пароль подтверждения не совпадает с оригинальным паролем',
  ],
  ['minlength', 'Значение слишком короткое'],
  ['required', 'Поле является обязательным'],
]);

export function getValidationError(key: string): string {
  const value: string = ERROR_MAP.get(key);
  return value ?? null;
}
