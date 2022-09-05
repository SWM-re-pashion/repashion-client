/* eslint-disable no-unsafe-optional-chaining */
import { useRouter } from 'next/router';

import { ReactElement, useCallback, useEffect } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import HeadMeta from '@atoms/HeadMeta';
import { sortData } from '@constants/index';
import { seoData } from '@constants/seo';
import Layout from '@templates/Layout';
import {
  getCategoryData,
  useCategoryTree,
  useMainCategoryTree,
  useSubCategory,
} from 'api/getCategoryData';
import CategoryBox from 'components/Shop/Organisms/CategoryBox';
import ShopHeader from 'components/Shop/Organisms/ShopHeader';
import SortBox from 'components/Shop/Organisms/SortBox';
import {
  categoryIdNameCodeArr,
  curCategoryChildrenByProp,
  findCodeByProp,
} from 'components/Upload/organisms/Dialog/utils';

import $ from './style.module.scss';

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('category', () => getCategoryData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Shop() {
  const router = useRouter();
  const { gender, main, sub, sort, hideSold } = router.query;
  // const { data } = useCategoryTree();
  const data = useCategoryTree();

  const genderCategory = data;
  const genderSelectMenu =
    genderCategory && categoryIdNameCodeArr(genderCategory);
  const genderQuery = (gender as string) || genderSelectMenu[0].id || '0';
  const genderName = findCodeByProp(genderSelectMenu, genderQuery, 'id');

  const mainCategory = useMainCategoryTree(genderName); // TODO: 2번 렌더링됨
  const mainSelectMenu = categoryIdNameCodeArr(mainCategory);
  const isIncludeMain = curCategoryChildrenByProp(mainCategory, 'id').includes(
    main as string,
  );
  const mainQuery = isIncludeMain
    ? (main as string)
    : mainSelectMenu[0].id || '0';

  const subCategory = useSubCategory(genderName, mainQuery, 'id');
  const subSelectMenu = categoryIdNameCodeArr(subCategory);
  const isIncludeSub = curCategoryChildrenByProp(subCategory, 'id').includes(
    sub as string,
  );
  const subQuery = isIncludeSub ? (sub as string) : subSelectMenu[0].id || '0';

  const sortQuery = (sort as string) || sortData[0].code;
  const soldQuery = (hideSold as string) || 'true';

  // useEffect(() => {
  //   if (router.isReady) console.log(gender, main, sub, sort, hideSold);
  // }, [gender, hideSold, main, sort, sub, router.isReady]);

  // useEffect(() => {
  //   console.log(subSelectMenu);
  // }, [subSelectMenu]);

  const onClick = useCallback(
    (queryName: string, value: string) => {
      let toBeQuery = {};
      if (queryName === 'gender') {
        toBeQuery = { gender: value, main: '1' };
      } else if (queryName === 'main') {
        if (value === '1')
          toBeQuery = { gender: router.query.gender, main: value };
        else toBeQuery = { gender: router.query.gender, main: value, sub: '1' };
      } else if (queryName === 'sub') {
        toBeQuery = { sub: value };
      } else {
        toBeQuery = { [queryName]: value };
      }
      router.push(
        {
          query: { ...router.query, ...toBeQuery },
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  return (
    <>
      <HeadMeta title="re:Fashion | 상품 피드" url={`${seoData.url}/shop`} />

      <ShopHeader
        {...{ onClick }}
        data={genderSelectMenu}
        selectedMenu={genderQuery}
      />
      <CategoryBox
        {...{ onClick }}
        data={mainSelectMenu}
        selectedMenu={mainQuery}
        isMain
      />
      <CategoryBox
        {...{ onClick }}
        data={subSelectMenu}
        selectedMenu={subQuery}
        isMain={false}
      />
      <SortBox
        {...{ onClick }}
        data={sortData}
        hideSold={soldQuery}
        selectedMenu={sortQuery}
      />
    </>
  );
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout noPadding padding="15px 0">
      {page}
    </Layout>
  );
};

export default Shop;
