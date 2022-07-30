/* eslint-disable react/display-name */
import { ChangeEvent, forwardRef, LegacyRef, memo } from 'react';

import classnames from 'classnames';
import { StyleProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  controlled: boolean;
  idx?: number;
  placeholder: string;
  value?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>, idx?: number) => void;
} & StyleProps;

const TextInput = forwardRef(
  (inputProps: Props, ref: LegacyRef<HTMLInputElement> | null) => {
    const { controlled, idx, placeholder, value, handleChange } = inputProps;
    const { style, className } = inputProps;
    return (
      <input
        {...{ style, placeholder, ref }}
        type="text"
        defaultValue={!controlled ? value : undefined}
        value={controlled ? value : undefined}
        className={classnames($['text-input'], className)}
        onChange={(e) => {
          if (typeof idx === 'number') handleChange(e, idx);
          else handleChange(e);
        }}
      />
    );
  },
);

export default memo(TextInput);
