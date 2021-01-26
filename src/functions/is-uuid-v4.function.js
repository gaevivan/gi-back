import { UUID_V4_REGEXP } from '../constants.js';

export default function isUuidV4(uuidV4) {
  return `${uuidV4}`.match(UUID_V4_REGEXP);
}
