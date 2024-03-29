import { QueryKey, useQuery } from '@tanstack/react-query';
import AsyncBoundary from '@templates/AsyncBoundary';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { ApiError } from 'src/api/core/error';

function SuspenseFallback() {
  return <span data-testid="isLoading">로딩중</span>;
}

function ErrorFallback<ErrorType extends Error = Error>(props: {
  error: ErrorType;
  reset: () => void;
}) {
  const { error, reset } = props;
  return (
    <>
      <span data-testid="errorMsg">{error.message}</span>
      <button type="button" data-testid="retryButton" onClick={reset}>
        다시 시도
      </button>
    </>
  );
}

const renderAsyncBoundary = (key: QueryKey, mock: jest.Mock<any, any>) => {
  function Component() {
    useQuery(key, () => mock());
    return <span data-testid="fetchedData">성공</span>;
  }

  return (
    <AsyncBoundary
      errorFallback={ErrorFallback}
      suspenseFallback={<SuspenseFallback />}
    >
      <Component />
    </AsyncBoundary>
  );
};

describe('AsyncBoundary', () => {
  it('로딩', async () => {
    const { findByTestId } = render(
      renderAsyncBoundary(['로딩', 1], jest.fn()),
    );
    await waitFor(() => {
      return expect(findByTestId('isLoading')).toBeTruthy();
    });
  });

  describe('에러 핸들링', () => {
    it('에러 발생', async () => {
      const mock = jest.fn().mockRejectedValue(new ApiError(400, '에러'));
      const { findByTestId } = render(renderAsyncBoundary(['에러', -1], mock));

      await waitFor(() => {
        return expect(findByTestId('errorMsg')).toBeTruthy();
      });
    });

    it('에러 발생 후, 다시 시도', async () => {
      const mock = jest
        .fn()
        .mockRejectedValueOnce(new ApiError(400, '에러'))
        .mockResolvedValueOnce({ data: '성공' });

      const { getByTestId, findByTestId } = render(
        renderAsyncBoundary(['retry', 2], mock),
      );

      await waitFor(() => {
        return expect(findByTestId('retryButton')).toBeTruthy();
      });

      fireEvent.click(getByTestId('retryButton'));

      await waitFor(() => {
        return expect(findByTestId('isLoading')).toBeTruthy();
      });
      await waitFor(() => {
        return expect(findByTestId('fetchedData')).toBeTruthy();
      });
    });

    it('데이터 fetch 완료', async () => {
      const mock = jest.fn().mockResolvedValueOnce({ data: '성공' });

      const { findByTestId } = render(renderAsyncBoundary(['완료', 3], mock));

      await waitFor(() => {
        return expect(findByTestId('isLoading')).toBeTruthy();
      });
      await waitFor(() => {
        return expect(findByTestId('fetchedData')).toBeTruthy();
      });
    });
  });
});
