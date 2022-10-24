/* eslint-disable react/no-array-index-key */
import { memo } from 'react';

import { SearchStoreState } from '#types/storeType/search';
import Span from '@atoms/Span';
import Keyword from 'src/components/Search/molecules/Keyword';

import $ from './style.module.scss';

type Props = {
  keywords: SearchStoreState['keywords'];
  removeKeyword: SearchStoreState['removeKeyword'];
  queryFunc: (value: string) => void;
};

function Keywords(inputProps: Props) {
  const { keywords, removeKeyword, queryFunc } = inputProps;

  return (
    <div className={$['keywords-box']}>
      <Span fontSize={18}>최근 검색어</Span>

      <ul
        className={$['current-keywords']}
        role="listbox"
        aria-label="최근 검색어 목록"
      >
        {keywords.length ? (
          keywords.map((keyword, i) => (
            <Keyword
              key={`${keyword}-${i}`}
              {...{ keyword, removeKeyword, queryFunc }}
            />
          ))
        ) : (
          <Span fontWeight={500}>검색어가 존재하지 않습니다.</Span>
        )}
      </ul>
    </div>
  );
}

export default memo(Keywords);
