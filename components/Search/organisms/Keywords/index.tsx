/* eslint-disable react/no-array-index-key */
import { memo } from 'react';

import { searchState } from '#types/storeType/search';
import Span from '@atoms/Span';
import Keyword from 'components/Search/molecules/Keyword';

import $ from './style.module.scss';

type Props = {
  keywords: searchState['keywords'];
  removeKeyword: searchState['removeKeyword'];
  queryFunc: (value: string) => Promise<boolean>;
};

function Keywords(inputProps: Props) {
  const { keywords, removeKeyword, queryFunc } = inputProps;

  return (
    <div className={$['keywords-box']}>
      <Span fontSize={18}>최근 검색어</Span>

      <div className={$['current-keywords']}>
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
      </div>
    </div>
  );
}

export default memo(Keywords);
