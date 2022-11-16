import { forwardRef, LegacyRef } from 'react';

import { SelectArrow } from '@atoms/icon';
import Span from '@atoms/Span';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  name: string;
  isClicked: boolean;
  labelName: string;
  isGender?: boolean;
  width?: string;
  height?: string;
  fontSize?: number;
  fontWeight?: number;
  children?: React.ReactNode;
  handleMouseDown: (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => void;
};

function SelectBoxView(
  viewProps: Props,
  ref: LegacyRef<HTMLButtonElement> | null,
) {
  const { name, width, height, fontSize, fontWeight, labelName } = viewProps;
  const { isGender, isClicked, handleMouseDown, children } = viewProps;

  return (
    <div
      className={classnames($['select-box'], {
        [$['select-box-clicked']]: isClicked,
        [$['gender-box']]: isGender,
      })}
      style={{ ...{ width, height } }}
    >
      <button
        id={`${name}-select-box`}
        ref={ref}
        type="button"
        aria-haspopup="true"
        aria-expanded="true"
        aria-controls={`${name}-select-list`}
        onClick={handleMouseDown}
      >
        <Span
          fontSize={fontSize || 16}
          fontWeight={fontWeight || 400}
          className={classnames($.text, {
            [$['gender-text']]: isGender,
          })}
        >
          {labelName || '선택'}
        </Span>
        <SelectArrow
          className={classnames($.arrow, {
            [$['arrow-clicked']]: isClicked,
          })}
        />
      </button>

      {isClicked && (
        <ul
          id={`${name}-select-list`}
          aria-labelledby={`${name}-select-box`}
          role="menu"
          tabIndex={0}
          style={{ top: height ? `calc(${height} + 6px)` : '56px' }}
          className={classnames($['select-wrapper'], {
            [$['select-wrapper-clicked']]: isClicked,
          })}
        >
          {children}
        </ul>
      )}
    </div>
  );
}

export default forwardRef(SelectBoxView);
