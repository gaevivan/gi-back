import { Pipe, PipeTransform } from '@angular/core';
import { Regex } from '@shared/enums/regex.enum';

@Pipe({ name: 'addHttp' })
export class AddHttpPipe implements PipeTransform {
  transform(value: string): string {
    const regex: RegExp = new RegExp(Regex.hasHttpOrHttps);
    if (value.match(regex) !== null) {
      return value;
    }
    return `http://${value}`;
  }
}
