import { memo } from 'react';

import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import InputRange from '@molecules/InputRange';

import $ from './style.module.scss';

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
      <InputRange
        defaultValue={{
          minValue: min,
          maxValue: max,
        }}
        left={states[0]}
        right={states[1]}
        step={step}
        update={update}
      />
      <div className={$['input-box']}>
        <TextInput
          controlled
          idx={0}
          placeholder={`${min.toLocaleString()}원 부터`}
          handleChange={handleChange}
          value={`${states[0]}`}
          ref={leftRef}
        />
        <span className={$['range-text']}>~</span>
        <TextInput
          controlled
          idx={1}
          placeholder={`${max.toLocaleString()}원 까지`}
          handleChange={handleChange}
          value={`${states[1]}`}
          ref={rightRef}
        />
      </div>
    </InfoArticle>
  );
}
export default memo(PriceInput);
