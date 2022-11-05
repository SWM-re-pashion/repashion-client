/* eslint-disable consistent-return */
import { NextRouter } from 'next/router';

import { AxiosError } from 'axios';
import { isInstanceOfAPIError } from 'src/api/core/error';
import { toastError } from 'src/utils/toaster';

export function errorHandler(err: AxiosError, router: NextRouter) {
  if (isInstanceOfAPIError(err)) {
    const { redirectUrl, notFound, status } = err;
    if (notFound) {
      return router.replace('/404');
    }
    if (status === 401 || status === 403)
      toastError({ message: '다시 로그인해주세요.' });
    if (redirectUrl) {
      router.replace(redirectUrl);
    }
  }
}
