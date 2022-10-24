import { queryKey } from '@constants/react-query';

import { getMyInfo } from '../../../api/profile/index';
import { useCoreQuery } from '../core';

export function useMyInfo() {
  const response = useCoreQuery(queryKey.myInfo, () => getMyInfo());
  return response;
}
