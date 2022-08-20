import { deepClone } from 'utils/deepClone';

import { arrToString } from './arrToString';
import { filterPrice } from './filterValue';
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
  filterPrice,
  mergeObjInArr,
  arrToString,
  getJudgeCategory,
  getMeasureElement,
};
