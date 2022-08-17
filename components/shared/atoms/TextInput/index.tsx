import { ChangeEvent, forwardRef, LegacyRef, memo } from 'react';

import classnames from 'classnames';
import { StyleProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  controlled: boolean;
  placeholder: string;
  label?: string;
  postLabel?: string;
  idx?: number;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, param?: number) => void;
} & StyleProps;

function TextInput(inputProps: Props, ref: LegacyRef<HTMLInputElement> | null) {
  const { controlled, idx, placeholder, value, onChange } = inputProps;
  const { label, postLabel, style, className } = inputProps;
  return (
    <div className={classnames($['text-input'], className)}>
      {label && (
        <label htmlFor={`input-${label}`} className={$.label}>
          {label}
        </label>
      )}
      <input
        id={label ? `input-${label}` : undefined}
        {...{ style, placeholder, ref }}
        type="text"
        defaultValue={!controlled ? value : undefined}
        value={controlled ? value : undefined}
        className={$.input}
        onChange={(e) => {
          if (typeof idx === 'number') onChange(e, idx);
          else onChange(e);
        }}
      />
      {postLabel && (
        <label htmlFor={`input-${label}`} className={$.label}>
          {postLabel}
        </label>
      )}
    </div>
  );
}

const TextInputWithRef = forwardRef(TextInput);

TextInputWithRef.displayName = 'TextInput';
export default memo(TextInputWithRef);
