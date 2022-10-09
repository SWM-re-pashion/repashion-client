/* eslint-disable max-classes-per-file */
export class ApiError extends Error {
  status: number;

  redirectUrl: string;

  notFound: boolean;

  constructor(status: number, message = 'http exception') {
    super(message);
    this.status = status;
    this.redirectUrl = '';
    this.notFound = false;
  }
}

export class NotFoundError extends ApiError {
  constructor(status: number, message = '찾을 수 없습니다.') {
    super(status, message);
    this.notFound = true;
  }
}

export class ForbiddenError extends ApiError {
  constructor(status: number, message = '인증처리에 실패했습니다.') {
    super(status, message);
    this.redirectUrl = '/login';
  }
}

export class AuthError extends ApiError {
  constructor(status: number, message = '인증되지 않은 사용자입니다.') {
    super(status, message);
    this.redirectUrl = '/login';
  }
}

export function isInstanceOfAPIError(object: unknown): object is ApiError {
  return (
    object instanceof ApiError &&
    ('redirectUrl' in object ||
      'notFound' in object ||
      'status' in object ||
      'message' in object)
  );
}
