import { useRouter } from 'next/router';

import { useMutation, UseMutationResult } from 'react-query';

import { InfoState } from '#types/storeType/info';
import { AxiosError } from 'axios';
import { Axios } from 'lib/axios';
import { arrToString } from 'utils';

const removeBlank = (str: string) => str.replace(/ /g, '');

export const postPreference = async (
  state: InfoState,
): Promise<res.Preference> => {
  const { topSize, bottomSize, topColors, bottomColors } = state;

  const requestData = {
    ...state,
    topSize: arrToString(topSize),
    bottomSize: arrToString(bottomSize),
    topColors: removeBlank(arrToString(topColors)),
    bottomColors: removeBlank(arrToString(bottomColors)),
  };
  delete requestData.infoUpdate;
  const { data } = await Axios.post<res.Preference>(
    '/api/preference',
    JSON.stringify(requestData),
  );

  return data;
};

export function usePostPreference(): UseMutationResult<
  res.Preference,
  AxiosError,
  InfoState
> {
  const router = useRouter();

  return useMutation(postPreference, {
    onSuccess: (data) => {
      console.log(data);
      router.push('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
