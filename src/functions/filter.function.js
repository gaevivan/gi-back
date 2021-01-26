import compare from './compare.function.js';
import { AND_OPERATOR, OR_OPERATOR } from '../constants.js';

export default function filter(dataItemList, filterItem) {
  return dataItemList.filter((dataItem) => filterOne(dataItem, filterItem));
}

function filterOne(dataItem, filterItem) {
  if (!filterItem) {
    return true;
  }
  if (filterItem.length > 2 && filterItem[1] === AND_OPERATOR) {
    return filter(dataItem, filterItem[0]) && filter(dataItem, filterItem[2]);
  } else if (filterItem.length > 2 && filterItem[1] === OR_OPERATOR) {
    return filter(dataItem, filterItem[0]) || filter(dataItem, filterItem[2])
  } else {
    return compare(dataItem, filterItem);
  }
}
