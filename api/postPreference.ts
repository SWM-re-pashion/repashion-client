import axios from 'lib/axios';
import { InfoState } from 'store/useInfoStore';

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

const arrToString = (arr: string[]) => arr.join('/');
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

  const { data } = await axios.post<PreferenceResponse>(
    '/api/preference/save',
    JSON.stringify(requestData),
  );
  return data;
};
