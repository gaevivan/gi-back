export function isNil(value: unknown): value is null {
  return value === null || value === undefined;
}