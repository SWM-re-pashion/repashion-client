import { NextRouter } from 'next/router';

import { ACCESSTOKEN_EXPIRED } from '@constants/api';
import { AxiosError } from 'axios';
import { isInstanceOfAPIError } from 'src/api/core/error';
import { toastError } from 'src/utils/toaster';

export function errorHandler(err: AxiosError, router: NextRouter) {
  if (isInstanceOfAPIError(err)) {
    const { redirectUrl, notFound, status, code } = err;
    const isStatus403 = status === 403;
    const isTokenExpired = code === ACCESSTOKEN_EXPIRED;
    if (notFound) {
      router.replace('/404');
    }
    if (status === 401 || (isStatus403 && !isTokenExpired))
      toastError({ message: '다시 로그인해주세요.' });
    if (redirectUrl) {
      if (isStatus403 && isTokenExpired) {
        console.log('is 403 && TokenExpired');
        return;
      }
      console.log('is Not 403 && TokenExpired');
      router.replace(redirectUrl);
    }
  }
}
