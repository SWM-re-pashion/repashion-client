import { useRouter } from 'next/router';

import { memo, useCallback } from 'react';

import Keywords from 'src/components/Search/organisms/Keywords';
import LatestProducts from 'src/components/Search/organisms/LatestProducts';
import ProductItemList from 'src/components/Shop/Organisms/ProductItemList';
import { useQueryRouter } from 'src/hooks';
import { useSearchStore } from 'src/store/useSearchStore';

import $ from './style.module.scss';

type Props = {
  value: string;
  queryStringObj: Omit<req.ShopFeed, 'page' | 'size'>;
};

function SearchBody(bodyProps: Props) {
  const { value, queryStringObj } = bodyProps;
  const router = useRouter();
  const queryFunc = useQueryRouter('value');
  const { keywords, latestProducts } = useSearchStore((state) => state);
  const removeKeyword = useSearchStore(
    useCallback((state) => state.removeKeyword, []),
  );
  const removeProduct = useSearchStore(
    useCallback((state) => state.removeProduct, []),
  );
  const moveProduct = useCallback(
    (id: number) => router.push(`/shop/${id}`),
    [router],
  );

  return value ? (
    <ProductItemList paddingTop="120px" isSearch {...{ queryStringObj }} />
  ) : (
    <section className={$['search-body']}>
      <Keywords {...{ keywords, removeKeyword, queryFunc }} />
      <LatestProducts
        {...{ products: latestProducts, removeProduct, moveProduct }}
      />
    </section>
  );
}

export default memo(SearchBody);
