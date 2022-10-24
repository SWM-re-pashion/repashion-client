import { memo, useCallback } from 'react';

import { orderData } from '@constants/category';
import SortBox from 'src/components/Shop/molecules/SortBox';
import { useQueryRouter } from 'src/hooks';
import { useSearchStore } from 'src/store/useSearchStore';
import { StyleProps } from '#types/props';

import SearchBar from '../SearchBar';
import $ from './style.module.scss';

type Props = {
  searchWord: string;
  hideSoldQuery: string;
  orderQuery: string;
} & StyleProps;

function SearchHeader(headerProps: Props) {
  const { searchWord, hideSoldQuery, orderQuery } = headerProps;
  const addKeyword = useSearchStore(
    useCallback((state) => state.addKeyword, []),
  );
  const valueQuery = useQueryRouter('value');
  const replaceValueQuery = useQueryRouter('value', 'REPLACE');
  const queryHideSold = useQueryRouter('hide_sold', 'REPLACE');
  const queryOrder = useQueryRouter('order', 'REPLACE');
  const searchQuery = searchWord ? replaceValueQuery : valueQuery;

  return (
    <header className={$['search-header']}>
      <SearchBar {...{ addKeyword, searchWord, queryFunc: searchQuery }} />
      {searchWord && (
        <SortBox
          {...{ onSoldClick: queryHideSold, onOrderClick: queryOrder }} // TODO: 렌더링 최적화
          data={orderData}
          hideSold={hideSoldQuery}
          selectedMenu={orderQuery}
        />
      )}
    </header>
  );
}

export default memo(SearchHeader);
