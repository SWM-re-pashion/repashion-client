import { memo, MouseEvent } from 'react';

import { SearchStoreState } from '#types/storeType/search';
import { ImgClose } from '@atoms/icon';
import Span from '@atoms/Span';

import $ from './style.module.scss';

type Props = {
  keyword: string;
  removeKeyword: SearchStoreState['removeKeyword'];
  queryFunc: (value: string) => Promise<boolean>;
};

function Keyword(inputProps: Props) {
  const { keyword, removeKeyword, queryFunc } = inputProps;
  const handleClick = () => queryFunc(keyword);
  const handleRemove = (e: MouseEvent) => {
    e.stopPropagation();
    removeKeyword(keyword);
  };

  return (
    <li>
      <div
        role="button"
        aria-label={`최근 검색어 ${keyword}`}
        tabIndex={0}
        className={$.keyword}
        onClick={handleClick}
        onKeyDown={handleClick}
      >
        <Span className={$['keyword-text']} fontWeight={500}>
          {keyword}
        </Span>
        <button type="button" onClick={handleRemove}>
          <ImgClose fill="#936dff" />
        </button>
      </div>
    </li>
  );
}

export default memo(Keyword);
