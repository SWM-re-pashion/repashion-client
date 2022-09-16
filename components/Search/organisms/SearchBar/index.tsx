import { memo, useEffect, useRef, useState } from 'react';

import BackBtn from '@atoms/BackBtn';
import Button from '@atoms/Button';
import { Search } from '@atoms/icon';
import TextInput from '@atoms/TextInput';
import classnames from 'classnames';
import { useQueryRouter } from 'hooks';
import { StyleProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  addKeyword: (value: string) => void;
} & StyleProps;

function SearchBar(searchProps: Props) {
  const { addKeyword } = searchProps;
  const [isFocus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onBlur = () => setFocus(false);
  const onFocus = () => setFocus(true);
  const queryFunc = useQueryRouter('word');

  useEffect(() => {
    inputRef.current?.focus();
    onFocus();
    return () => onFocus();
  }, []);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      const { value } = e.currentTarget;
      queryFunc(value);
      addKeyword(value);
    }
  };

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
            onKeyDown={handleEnter}
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

export default memo(SearchBar);
