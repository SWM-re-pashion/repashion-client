import { memo, useCallback, useRef, ChangeEvent } from 'react';

import classNames from 'classnames';
import type { StyleProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
} & StyleProps;

function TextArea(textareaProps: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { placeholder, value, onChange } = textareaProps;
  const { className, style, color, fontSize, fontWeight } = textareaProps;

  const autoResizeTextArea = useCallback(() => {
    const ref = textAreaRef.current;
    if (ref) {
      ref.style.height = 'auto';
      ref.style.height = `${ref.scrollHeight}px`;
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    autoResizeTextArea();
    onChange(e);
  };

  return (
    <textarea
      {...{ placeholder }}
      ref={textAreaRef}
      defaultValue={value}
      style={{ ...style, borderColor: color, fontWeight, fontSize }}
      className={classNames($.textarea, className)}
      onChange={handleChange}
    />
  );
}

export default memo(TextArea);
