import { deepClone } from 'src/utils/deepClone';

import { arrToString } from './arrToString';
import { filterMaxPrice, validatePriceRange } from './filterValue';
import {
  getPropFromQuery,
  getQueriesArr,
  getQueryString,
  getQueryStringObj,
} from './getQueryString';
import { mergeObjInArr } from './mergeObjInArr';
import { updateInfo } from './updateInfo';

export {
  updateInfo,
  deepClone,
  filterMaxPrice,
  mergeObjInArr,
  arrToString,
  getQueryString,
  validatePriceRange,
  getQueryStringObj,
  getQueriesArr,
  getPropFromQuery,
};
