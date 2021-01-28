export function isNil<T = unknown>(value: T): value is null {
  return value === null || value === undefined;
}