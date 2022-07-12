/* eslint-disable react/display-name */
import { ChangeEvent, forwardRef, LegacyRef, memo } from 'react';

import classnames from 'classnames';
import { StyleProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  placeholder: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & StyleProps;

const TextInput = forwardRef(
  (
    { style, className, placeholder, handleChange }: Props,
    ref: LegacyRef<HTMLInputElement> | null,
  ) => {
    return (
      <input
        {...{ style, placeholder, ref }}
        type="text"
        className={classnames($['text-input'], className)}
        onChange={handleChange}
      />
    );
  },
);

export default memo(TextInput);
