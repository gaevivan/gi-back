import isNil from './is-nil.function.js';

export default function isEmpty(value) {
  return isNil(value) || !Array.isArray(value) || value.length === 0;
}
