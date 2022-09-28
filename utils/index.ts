import { deepClone } from 'utils/deepClone';

import { arrToString } from './arrToString';
import { filterMaxPrice, validatePriceRange } from './filterValue';
import getQueryString from './getQueryString';
import { getJudgeCategory, getMeasureElement } from './measure';
import { mergeObjInArr } from './mergeObjInArr';
import {
  productSizeUtil,
  judgeProductIcon,
  productBasicUtil,
  productNoticeUtil,
} from './product';
import { updateInfo } from './updateInfo';

export {
  updateInfo,
  productSizeUtil,
  productBasicUtil,
  productNoticeUtil,
  judgeProductIcon,
  deepClone,
  filterMaxPrice,
  mergeObjInArr,
  arrToString,
  getJudgeCategory,
  getMeasureElement,
  getQueryString,
  validatePriceRange,
};
