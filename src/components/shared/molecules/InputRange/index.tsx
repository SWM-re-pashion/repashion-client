import { FormEvent, memo, useEffect, useRef } from 'react';

import { RangeBtn } from '@atoms/icon';
import classnames from 'classnames';
import useDebounceInput from 'src/hooks/useDebounceInput';

import $ from './style.module.scss';
import { inputProps } from './utils';

type Props = {
  minValue: number;
  maxValue: number;
  left: number;
  right: number;
  step: number;
  update: (value: number, idx: number) => void;
};

function InputRange(rangeProps: Props) {
  const { left, right, step, update, minValue, maxValue } = rangeProps;
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const thumbRefs = useRef<SVGSVGElement[]>([]);
  const rangeRef = useRef<HTMLDivElement>(null);
  const handleInput = useDebounceInput<[number, number]>(update, 100);

  useEffect(() => {
    // SSR에서 적용되는지 확인
    const initRange = () => {
      const leftThumb = thumbRefs.current && thumbRefs.current[0];
      const rightThumb = thumbRefs.current && thumbRefs.current[1];

      const leftPercent = ((left - minValue) / maxValue) * 100;
      const rightPercent = ((right - minValue) / maxValue) * 100;

      if (leftThumb && rightThumb && rangeRef.current) {
        leftThumb.style.left = `${leftPercent}%`;
        rangeRef.current.style.left = `${leftPercent}%`;
        rightThumb.style.right = `${100 - rightPercent}%`;
        rangeRef.current.style.right = `${100 - rightPercent}%`;
      }
    };
    initRange();

    return () => initRange();
  }, [left, right]);

  const handleValue = (e: FormEvent<HTMLInputElement>, direction: number) => {
    const isLeft = direction === 0;
    const { value, min, max } = e.currentTarget;

    const thumbRef = thumbRefs.current && thumbRefs.current[+!isLeft];
    const inputRef = inputRefs.current && inputRefs.current[+!isLeft];
    const otherThumb = thumbRefs.current && thumbRefs.current[+isLeft];
    const otherInput = inputRefs.current && inputRefs.current[+isLeft];

    if (isLeft && otherInput) {
      e.currentTarget.value = `${Math.min(+value, +otherInput.value - step)}`;
      if (right === +e.currentTarget.value + step) {
        thumbRef.style.zIndex = '2';
        inputRef.style.zIndex = '2';
        otherThumb.style.zIndex = '1';
        otherInput.style.zIndex = '1';
      }
    } else if (!isLeft && otherInput) {
      e.currentTarget.value = `${Math.max(+value, +otherInput.value + step)}`;
      if (left === +e.currentTarget.value - step) {
        thumbRef.style.zIndex = '2';
        inputRef.style.zIndex = '2';
        otherThumb.style.zIndex = '1';
        otherInput.style.zIndex = '1';
      }
    }

    const percent = ((+e.currentTarget.value - +min) / (+max - +min)) * 100;

    if (thumbRef && rangeRef.current) {
      if (isLeft) {
        thumbRef.style.left = `${percent}%`;
        rangeRef.current.style.left = `${percent}%`;
      } else {
        thumbRef.style.right = `${100 - percent}%`;
        rangeRef.current.style.right = `${100 - percent}%`;
      }
    }
    if (isLeft) {
      handleInput(+e.currentTarget.value, 0);
    } else {
      handleInput(+e.currentTarget.value, 1);
    }
  };

  return (
    <div className={$['input-range']}>
      <input
        {...inputProps(left, step, minValue, maxValue)}
        className={classnames($.input, $['input-left'])}
        id="input-left"
        ref={(elem: HTMLInputElement) => {
          if (inputRefs.current) inputRefs.current[0] = elem;
        }}
        onInput={(e) => handleValue(e, 0)}
      />
      <input
        {...inputProps(right, step, minValue, maxValue)}
        className={classnames($.input, $['input-right'])}
        id="input-right"
        ref={(elem: HTMLInputElement) => {
          if (inputRefs.current) inputRefs.current[1] = elem;
        }}
        onInput={(e) => handleValue(e, 1)}
      />

      <div className={$.track}>
        <div className={$.range} ref={rangeRef} />
        <RangeBtn
          className={classnames($.thumb, $.left)}
          ref={(elem: SVGSVGElement) => {
            if (thumbRefs.current) thumbRefs.current[0] = elem;
          }}
        />
        <RangeBtn
          className={classnames($.thumb, $.right)}
          ref={(elem: SVGSVGElement) => {
            if (thumbRefs.current) thumbRefs.current[1] = elem;
          }}
        />
      </div>
    </div>
  );
}
export default memo(InputRange);
