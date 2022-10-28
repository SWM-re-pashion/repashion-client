/* eslint-disable @typescript-eslint/no-unused-vars */
import { InfoState } from '#types/storeType/info';
import { arrToString } from 'src/utils';

const removeBlank = (str: string) => str.replace(/ /g, '');

export const refinePreferenceData = (state: InfoState): req.Preference => {
  const { infoUpdate, ...rest } = state;
  const { topSize, bottomSize, topColors, bottomColors } = rest;

  return {
    ...rest,
    topSize: arrToString(topSize),
    bottomSize: arrToString(bottomSize),
    topColors: removeBlank(arrToString(topColors)),
    bottomColors: removeBlank(arrToString(bottomColors)),
  };
};
