import { useRouter } from 'next/router';

import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { isInstanceOfAPIError } from 'src/api/core/error';

import { toastError } from '../../../utils/toaster';

export function useCoreQuery<T, U = null>(
  keyName: QueryKey,
  query: QueryFunction<T, QueryKey>,
  options?: Omit<
    UseQueryOptions<T, AxiosError, U extends null ? T : U>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<U extends null ? T : U, AxiosError> {
  const router = useRouter();
  return useQuery(keyName, query, {
    onError: (err) => {
      if (isInstanceOfAPIError(err)) {
        const { redirectUrl, notFound, status } = err;
        if (notFound) {
          return router.push('/404');
        }
        if (status === 401 || status === 403)
          toastError({ message: '다시 로그인해주세요.' });
        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }
      return console.error(err);
    },
    ...options,
  });
}

export function useCoreMutation<T, U>(
  mutation: MutationFunction<T, U>,
  options?: Omit<UseMutationOptions<T, AxiosError, U>, 'mutationKey'>,
): UseMutationResult<T, AxiosError, U> {
  const router = useRouter();
  return useMutation(mutation, {
    onError: (err) => {
      if (isInstanceOfAPIError(err)) {
        const { redirectUrl, notFound, status } = err;
        if (notFound) {
          return router.push('/404');
        }
        if (status === 401 || status === 403)
          toastError({ message: '다시 로그인해주세요.' });
        if (redirectUrl) {
          router.push(redirectUrl);
        }
      }
      return console.error(err);
    },
    ...options,
  });
}

export function useCoreInfiniteQuery<T>(
  keyName: QueryKey,
  query: QueryFunction<T, QueryKey>,
  options?: Omit<
    UseInfiniteQueryOptions<T, AxiosError>,
    'queryKey' | 'queryFn'
  >,
): UseInfiniteQueryResult<T, AxiosError> {
  return useInfiniteQuery(keyName, query, {
    onError: (err) => {
      return console.error(err);
    },
    ...options,
  });
}
