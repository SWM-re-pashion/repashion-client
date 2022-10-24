import { AxiosError } from 'axios';

import {
  AuthError,
  ForbiddenError,
  isAxiosError,
  NotFoundError,
} from './error';

export default function ErrorInterceptor(err: AxiosError): AxiosError {
  if (isAxiosError<res.error>(err) && err.response) {
    const {
      data: { status, message },
    } = err.response;
    if (status === 404) {
      throw new NotFoundError(status, message);
    } else if (status === 403) {
      throw new ForbiddenError(status, message);
    } else if (status === 401) {
      throw new AuthError(status, message);
    } else if (status === 400 && message === '해당 상품이 존재하지 않습니다') {
      throw new NotFoundError(status, message);
    }
  }

  return err;
}
