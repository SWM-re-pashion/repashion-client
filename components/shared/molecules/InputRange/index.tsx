import { FormEvent, useEffect, useRef, useState } from 'react';

import classnames from 'classnames';
import { RangeBtn } from 'components/shared/atoms/icon';
import useDebounceInput from 'hooks/useDebounceInput';

import $ from './style.module.scss';

interface Props {
  rangeValue?: number;
}

export default function InputRange({ rangeValue }: Props) {
  const [range, setRange] = useState(['155', '165']);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const thumbRefs = useRef<SVGSVGElement[]>([]);
  const rangeRef = useRef<HTMLDivElement>(null);
  const handleInput = useDebounceInput<[string, string]>(setRange);

  useEffect(() => {
    const initRange = () => {
      const leftThumb = thumbRefs.current && thumbRefs.current[0];
      const rightThumb = thumbRefs.current && thumbRefs.current[1];

      const leftPercent = ((+range[0] - 140) / 50) * 100;
      const rightPercent = ((+range[1] - 140) / 50) * 100;

      if (leftThumb && rightThumb && rangeRef.current) {
        leftThumb.style.left = `${leftPercent}%`;
        rangeRef.current.style.left = `${leftPercent}%`;
        rightThumb.style.right = `${100 - rightPercent}%`;
        rangeRef.current.style.right = `${100 - rightPercent}%`;
      }
    };
    initRange();

    return () => initRange();
  }, []);

  const handleValue = (e: FormEvent<HTMLInputElement>, direction: number) => {
    const isLeft = direction === 0;
    const { value, min, max } = e.currentTarget;

    const inputRef = inputRefs.current && inputRefs.current[+isLeft];
    const thumbRef = thumbRefs.current && thumbRefs.current[+!isLeft];

    if (isLeft && inputRef && +inputRef.value - +value < 10)
      e.currentTarget.value = `${+inputRef.value - 5}`;
    else if (!isLeft && inputRef && +value - +inputRef.value < 10)
      e.currentTarget.value = `${+inputRef.value + 5}`;

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
    if (isLeft) handleInput([e.currentTarget.value, range[1]]);
    else handleInput([range[0], e.currentTarget.value]);
  };

  return (
    <>
      <span className={$.info}>{`${range[0]} ~ ${range[1]}`}</span>
      <div className={$['input-range']}>
        <input
          className={classnames($.input, $['input-left'])}
          type="range"
          id="input-left"
          ref={(elem: HTMLInputElement) => {
            if (inputRefs.current) inputRefs.current[0] = elem;
          }}
          min="140"
          max="190"
          value={range[0]}
          step="5"
          onInput={(e) => handleValue(e, 0)}
        />
        <input
          className={classnames($.input, $['input-right'])}
          type="range"
          id="input-right"
          ref={(elem: HTMLInputElement) => {
            if (inputRefs.current) inputRefs.current[1] = elem;
          }}
          min="140"
          max="190"
          value={range[1]}
          step="5"
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
    </>
  );
}
