import { memo, useCallback, useEffect, useRef, useState } from 'react';

import BackBtn from '@atoms/BackBtn';
import Button from '@atoms/Button';
import { Search } from '@atoms/icon';
import TextInput from '@atoms/TextInput';
import classnames from 'classnames';
import { StyleProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  addKeyword: (value: string) => void;
  searchWord: string;
  queryFunc: (value?: string | undefined) => Promise<boolean>;
} & StyleProps;

function SearchBar(searchProps: Props) {
  const { addKeyword, searchWord, queryFunc } = searchProps;
  const [isFocus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onBlur = useCallback(() => setFocus(false), []);
  const onFocus = useCallback(() => setFocus(true), []);

  useEffect(() => {
    inputRef.current?.focus();
    onFocus();
    return () => {
      onFocus();
    };
  }, [onFocus]);

  useEffect(() => {
    setInputValue(searchWord);
  }, [searchWord]);

  const handleEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      if (e.keyCode === 13 && value) {
        queryFunc(value);
        addKeyword(value);
        inputRef.current?.blur();
      }
    },
    [addKeyword, queryFunc],
  );

  const handleClick = useCallback(() => {
    if (inputValue) {
      queryFunc(inputValue);
      addKeyword(inputValue);
    } else {
      inputRef.current?.focus();
    }
  }, [addKeyword, inputValue, queryFunc]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
    [],
  );

  return (
    <header className={$['search-header']}>
      <div className={$['search-header-wrapper']}>
        <BackBtn color="#000" className={$['back-btn']} />

        <div
          role="search"
          aria-label="상품 검색하기"
          className={classnames($['search-box'], { [$.focus]: isFocus })}
        >
          <TextInput
            {...{ onBlur, onFocus }}
            ref={inputRef}
            value={inputValue}
            controlled
            placeholder="어떤 제품을 찾으세요?"
            onChange={handleInput}
            onKeyDown={handleEnter}
            className={$['search-input']}
          />
          <Button
            iconBtn
            className={$['search-btn']}
            label="search-product-btn"
            onClick={handleClick}
          >
            <Search fill="#000" size={18} strokeWidth={2} opacity={1} />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default memo(SearchBar);
