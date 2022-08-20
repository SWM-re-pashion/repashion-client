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
  subType?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, param?: number | string) => void; // Todo: 제네릭화
} & StyleProps;

function TextInput(inputProps: Props, ref: LegacyRef<HTMLInputElement> | null) {
  // Todo: forwardRef 제네릭 컴포넌트화 및 리팩토링
  const { controlled, idx, placeholder, value, onChange } = inputProps;
  const { label, postLabel, style, className, subType } = inputProps;
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
        id={label ? `input-${label}` : undefined}
        {...{ style, placeholder, ref }}
        type="text"
        defaultValue={toBeDeafultValue}
        value={toBeValue}
        className={$.input}
        onChange={(e) => {
          if (typeof idx === 'number') onChange(e, idx);
          if (subType) onChange(e, subType);
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
