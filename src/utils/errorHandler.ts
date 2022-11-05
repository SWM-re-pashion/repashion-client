/* eslint-disable consistent-return */
import { NextRouter } from 'next/router';

import { ACCESSTOKEN_EXPIRED } from '@constants/api';
import { AxiosError } from 'axios';
import { isInstanceOfAPIError } from 'src/api/core/error';
import { toastError } from 'src/utils/toaster';

export function errorHandler(err: AxiosError, router: NextRouter) {
  if (isInstanceOfAPIError(err)) {
    const { redirectUrl, notFound, status, code } = err;
    if (notFound) {
      return router.replace('/404');
    }
    if (status === 401 || (status === 403 && code !== ACCESSTOKEN_EXPIRED))
      toastError({ message: '다시 로그인해주세요.' });
    if (redirectUrl) {
      router.replace(redirectUrl);
    }
  }
}
