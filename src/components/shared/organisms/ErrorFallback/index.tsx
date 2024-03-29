import { StyleProps } from '#types/props';
import Span from '@atoms/Span';
import classnames from 'classnames';
import { ApiError } from 'src/api/core/error';

import $ from './style.module.scss';

type Props = {
  error: Error | ApiError;
  reset: () => void;
  otherRenderComponent?: JSX.Element;
  includedStatusCodes?: number[];
} & StyleProps;

function ErrorFallback(props: Props) {
  const { error, reset, className } = props;
  const { otherRenderComponent, includedStatusCodes } = props;

  const isIncludeOtherRender = () => {
    if ('status' in error)
      return includedStatusCodes?.some((code) => error.status === code);
    return false;
  };

  const otherRenderCondition = !!otherRenderComponent && isIncludeOtherRender();

  return otherRenderCondition ? (
    otherRenderComponent
  ) : (
    <div className={classnames($['error-fallback'], className)}>
      <div className={$['error-fallback-box']}>
        <Span fontSize={14} className={$['error-msg']}>
          네트워크 오류가 발생했습니다.
        </Span>

        <button
          type="button"
          onClick={reset}
          className={classnames($.btn, $.reset)}
        >
          <Span fontSize={14}>다시 시도</Span>
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
