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
  categoryNameCodeArr,
  curCategoryChildren,
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
  const { data } = useCategoryTree();

  const genderCategory = data?.data;
  const genderSelectMenu =
    (genderCategory && curCategoryChildren(genderCategory)) || [];
  const genderQuery = (gender as string) || genderSelectMenu[0];

  const mainCategory = useMainCategoryTree(genderQuery); // TODO: 2번 렌더링됨
  const mainSelectMenu = categoryNameCodeArr(mainCategory);
  const isIncludeMain = curCategoryChildren(mainCategory).includes(main as string);
  const mainQuery = isIncludeMain ? (main as string) : mainSelectMenu[0].code;

  const subCategory = useSubCategory(genderQuery, mainQuery);
  const subSelectMenu = categoryNameCodeArr(subCategory);
  const isIncludeSub = curCategoryChildren(subCategory).includes(sub as string);
  const subQuery = isIncludeSub ? (sub as string) : subSelectMenu[0].code;

  const sortQuery = (sort as string) || sortData[0].code;
  const soldQuery = (hideSold as string) || 'true';

  // useEffect(() => {
  //   if (router.isReady) console.log(gender, main, sub, sort, hideSold);
  // }, [gender, hideSold, main, sort, sub, router.isReady]);

  useEffect(() => {
    console.log(subSelectMenu);
  }, [subSelectMenu]);

  const onClick = useCallback(
    (queryName: string, value: string) => {
      router.push(
        {
          query: { ...router.query, [queryName]: value },
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
