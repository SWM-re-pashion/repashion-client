import { useRouter } from 'next/router';

import { ReactElement, useEffect, useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import HeadMeta from '@atoms/HeadMeta';
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
import {
  categoryNameCodeArr,
  curCategoryChildren,
} from 'components/Upload/organisms/Dialog/utils';

import $ from './style.module.scss';

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('category', () => getCategoryData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Shop() {
  const [category, setCategory] = useState('all');
  const router = useRouter(); // query가 이상하면 api 호출 취소하기
  const { data } = useCategoryTree();
  const genderCategory = data?.data;
  const mainCategory = useMainCategoryTree('women');
  const subCategory = useSubCategory('women', 'outer');
  // console.log(genderCategory && curCategoryChildren(genderCategory));
  const genderSelectMenu =
    (genderCategory && curCategoryChildren(genderCategory)) || [];
  const mainSelectMenu = categoryNameCodeArr(mainCategory);
  const subSelectMenu = categoryNameCodeArr(subCategory);

  // useEffect(() => {
  //   router.push(
  //     {
  //       query: { category },
  //     },
  //     undefined,
  //     { shallow: true },
  //   );
  // }, [category]);

  useEffect(() => {
    console.log(mainCategory);
  }, [mainCategory]);

  const categories = ['all', 'top', 'bottom', 'outer'];

  return (
    <>
      <HeadMeta title="re:Fashion | 상품 피드" url={`${seoData.url}/shop`} />

      <ShopHeader
        data={genderSelectMenu}
        seletedMenu="men"
        onChange={() => console.log('gender')}
      />
      <CategoryBox data={mainSelectMenu} selectedMenu="outer" isMain />
      <CategoryBox data={subSelectMenu} selectedMenu="zipup" isMain={false} />
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
