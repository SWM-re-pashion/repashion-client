import { InfoState } from '#types/storeType/info';
import { Axios } from 'lib/axios';
import { arrToString } from 'utils';

export type PreferenceRequest = {
  styles: number[];
  gender: string;
  height: string;
  bodyShape: string;
  topSize: string[];
  bottomSize: string[];
  topColor: string[];
  bottomColor: string[];
};

export type PreferenceResponse = {
  staus: number;
  style: string;
};

const removeBlank = (str: string) => str.replace(/ /g, '');

export const postPreference = async (
  state: InfoState,
): Promise<PreferenceResponse> => {
  const { topSize, bottomSize, topColors, bottomColors } = state;

  const requestData = {
    ...state,
    topSize: arrToString(topSize),
    bottomSize: arrToString(bottomSize),
    topColors: removeBlank(arrToString(topColors)),
    bottomColors: removeBlank(arrToString(bottomColors)),
  };
  delete requestData.infoUpdate;

  const { data } = await Axios.post<PreferenceResponse>(
    '/api/preference/save',
    JSON.stringify(requestData),
  );
  return data;
};
