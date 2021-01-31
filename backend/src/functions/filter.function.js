import compare from './compare.function.js';
import { AND_OPERATOR, NO_OPERATOR, OR_OPERATOR } from '../constants.js';
import isEmpty from './is-empty.function.js';

export default function filterData(data, filter) {
  return data.filter((dataItem) => filterOne(dataItem, filter));
}

function filterOne(dataItem, filter) {
  if (isEmpty(filter) && filter.length === 1) {
    return true;
  }
  if (filter[0] === OR_OPERATOR) {
    const filterItemList = filter.slice(1);
    return filterItemList.some((filterItem) => filterOne(dataItem, filterItem));
  }
  if (filter[0] === AND_OPERATOR) {
    const filterItemList = filter.slice(1);
    return filterItemList.every((filterItem) => filterOne(dataItem, filterItem));
  }
  if (filter[0] === NO_OPERATOR) {
    return !filterOne(dataItem, filter[1]);
  }
  return compare(dataItem, filter);
}
