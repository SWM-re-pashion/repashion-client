import { ChangeEvent, forwardRef, memo, Ref } from 'react';

import classnames from 'classnames';
import { StyleProps } from 'types/props';

import $ from './style.module.scss';

type Props<T> = {
  controlled: boolean;
  placeholder: string;
  label?: string;
  postLabel?: string;
  value?: string;
  subType?: T;
  onChange: (e: ChangeEvent<HTMLInputElement>, param?: T) => void;
  onBlur?: () => void;
  onFocus?: () => void;
} & StyleProps;

function TextInput<T>(inputProps: Props<T>, ref: Ref<HTMLInputElement> | null) {
  const { controlled, placeholder, value, onChange, onBlur } = inputProps;
  const { label, postLabel, style, className, subType, onFocus } = inputProps;
  const toBeValue = controlled ? value : undefined;
  const toBeDeafultValue = !controlled ? value : undefined;

  return (
    <div className={classnames($['text-input'], className)}>
      {label && (
        <label htmlFor={`input-${label}`} className={$.label}>
          {label}
        </label>
      )}
      <input
        {...{ placeholder, ref }}
        id={label ? `input-${label}` : undefined}
        style={{ ...style }}
        type="text"
        defaultValue={toBeDeafultValue}
        value={toBeValue}
        className={$.input}
        onChange={(e) => {
          if (subType !== undefined) onChange(e, subType);
          else onChange(e);
        }}
        onBlur={() => {
          if (onBlur) onBlur();
        }}
        onFocus={() => {
          if (onFocus) onFocus();
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
export default memo(TextInputWithRef) as <T>(
  props: Props<T> & { ref?: Ref<HTMLInputElement> },
) => JSX.Element;
