import { ReactElement } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { queries, queryData } from '@constants/queryString';
import { queryKey } from '@constants/react-query';
import { seoData } from '@constants/seo';
import Footer from '@organisms/Footer';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import {
  getBreadcrumb,
  getCategoryTree,
  getSelectedCategory,
} from 'src/api/category';
import { getStaticData } from 'src/api/staticData';
import ProductItemList from 'src/components/Shop/Organisms/ProductItemList';
import ShopHeader from 'src/components/Shop/Organisms/ShopHeader';
import { categoryPropArr } from 'src/components/Upload/organisms/Dialog/utils';
import { judgeCategoryId } from 'src/helpers/shop';
import { useMultipleSearch } from 'src/hooks';
import { useCategoryTree } from 'src/hooks/api/category';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery(queryKey.category(false), () =>
    getSelectedCategory(false),
  );
  await queryClient.fetchQuery(queryKey.staticData('Style'), () =>
    getStaticData('Style'),
  );
  await queryClient.fetchQuery(queryKey.staticData('Color'), () =>
    getStaticData('Color'),
  );
  await queryClient.fetchQuery(queryKey.staticData('Size'), () =>
    getStaticData('Size'),
  );
  await queryClient.fetchQuery(queryKey.staticData('Length'), () =>
    getStaticData('Length'),
  );
  await queryClient.fetchQuery(queryKey.staticData('Fit'), () =>
    getStaticData('Fit'),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

function Shop() {
  const data = useCategoryTree(false)?.data;
  const queryObj = useMultipleSearch(queryData, queries);
  const { category, hideSold, order } = queryObj;

  if (!data) return null;

  const gender = category[0];
  const genderSelectMenu = data.children;
  const existingGender = genderSelectMenu[0].id;
  const genderQuery = gender || existingGender;

  const id = judgeCategoryId(category);
  const selectData = getCategoryTree(data, id);
  const breadCrumb = getBreadcrumb(data, id) || '';
  const isInclude = categoryPropArr(selectData, 'id').includes(category);
  const categoryQuery = isInclude ? category : selectData[0].id;
  const genderData = categoryQuery[0];
  const isRecommend = categoryQuery.includes('999');
  const productType = isRecommend ? 'recommend' : 'shop';
  const categoryData = isRecommend ? genderData : categoryQuery;

  const queryStringObj: Omit<req.ShopFeed, 'page' | 'size'> = {
    ...queryObj,
    category: categoryData,
  };

  const props = {
    genderQuery,
    categoryQuery,
    orderQuery: order,
    hideSoldQuery: hideSold,
    genderSelectMenu,
    selectData,
    breadCrumb,
    isRecommend,
  };

  return (
    <>
      <HeadMeta title="re:Fashion | 상품 피드" url={`${seoData.url}/shop`} />
      <ShopHeader {...props} />
      <ProductItemList
        needPullToRefresh
        type={productType}
        {...{ queryStringObj }}
      />
      {/** TODO: 렌더링 최적화 */}
      <Footer />
    </>
  );
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Shop;
