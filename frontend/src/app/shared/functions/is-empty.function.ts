import { isNil } from "./is-nil.function";

export function isEmpty(value: unknown): value is null {
  return isNil(value) || !Array.isArray(value) || value.length === 0;
}