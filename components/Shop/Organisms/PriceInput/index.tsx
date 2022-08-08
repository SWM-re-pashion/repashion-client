import { memo } from 'react';

import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import InputRange from '@molecules/InputRange';

import $ from './style.module.scss';
import { priceInputProps, rangeProps } from './utils';

type Props = {
  label: string;
  max: number;
  min: number;
  step: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, idx?: number) => void;
  leftRef: React.RefObject<HTMLInputElement>;
  rightRef: React.RefObject<HTMLInputElement>;
  states: [number, number];
  update: (value: number, idx: number) => void;
};

function PriceInput(priceProps: Props) {
  const { label, handleChange, leftRef, rightRef, states, update } = priceProps;
  const { max, min, step } = priceProps;

  return (
    <InfoArticle label={label}>
      <InputRange {...rangeProps(states, step, min, max)} update={update} />

      <div className={$['input-box']}>
        <TextInput
          {...priceInputProps(0, states, min)}
          onChange={handleChange}
          ref={leftRef}
        />
        <span className={$['range-text']}>~</span>
        <TextInput
          {...priceInputProps(1, states, max)}
          onChange={handleChange}
          ref={rightRef}
        />
      </div>
    </InfoArticle>
  );
}
export default memo(PriceInput);
