import { forwardRef, memo, Ref, useEffect, useRef, useState } from 'react';

import BackBtn from '@atoms/BackBtn';
import Button from '@atoms/Button';
import { Search } from '@atoms/icon';
import TextInput from '@atoms/TextInput';
import classnames from 'classnames';
import { StyleProps } from 'types/props';

import $ from './style.module.scss';

type Props<T> = {
  label?: string;
  postLabel?: string;
  value?: string;
  subType?: T;
} & StyleProps;

function SearchBar<T>(inputProps: Props<T>, ref: Ref<HTMLInputElement> | null) {
  const { value } = inputProps;
  const [isFocus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onBlur = () => setFocus(false);
  const onFocus = () => {
    inputRef.current?.focus();
    setFocus(true);
  };

  useEffect(() => {
    onFocus();
    return () => onFocus();
  }, []);

  return (
    <header className={$['search-header']}>
      <div className={$['search-header-wrapper']}>
        <BackBtn color="#000" className={$['back-btn']} />

        <div className={classnames($['search-box'], { [$.focus]: isFocus })}>
          <TextInput
            {...{ onBlur, onFocus }}
            ref={inputRef}
            controlled
            placeholder="어떤 제품을 찾으세요?"
            onChange={() => console.log(3)}
            className={$['search-input']}
          />
          <Button
            iconBtn
            className={$['search-btn']}
            label="search-product-btn"
          >
            <Search fill="#000" size={18} strokeWidth={2} opacity={1} />
          </Button>
        </div>
      </div>
    </header>
  );
}

const SearchBarWithRef = forwardRef(SearchBar);
export default memo(SearchBarWithRef) as <T>(
  props: Props<T> & { ref?: Ref<HTMLInputElement> },
) => JSX.Element;
