import { useRouter } from 'next/router';

import { ReactElement, useCallback, useEffect } from 'react';

import { queryKey } from '@constants/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import UploadTemplate from '@templates/UploadTemplate';
import {
  getBreadcrumb,
  getCategory,
  getCategoryPartialTree,
} from 'api/category';
import { withGetServerSideProps } from 'api/core/withGetServerSideProps';
import { getUploadedProduct } from 'api/product';
import { useCategoryTree } from 'hooks/api/category';
import { useUploadedProduct } from 'hooks/api/upload';
import { useUploadUpdateStore } from 'store/upload/useUploadUpdateStore';
import { toastError } from 'utils/toaster';
import { judgeValid } from 'utils/upload.utils';

export const getServerSideProps = withGetServerSideProps(async ({ params }) => {
  const id = params?.id as string;
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(queryKey.category(false), () => getCategory());
  await queryClient.fetchQuery(queryKey.uploadedProduct(id), () =>
    getUploadedProduct(id),
  );

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
});

function UploadUpdate({ id }: { id: string }) {
  const { data } = useUploadedProduct(id);
  const categoryData = useCategoryTree(false)?.data;
  const router = useRouter();
  const states = useUploadUpdateStore((state) => state);
  const categoryId = data?.data.basicInfo.category;
  if (!categoryData || !categoryId) return null;

  const tree = getCategoryPartialTree(categoryData, categoryId);
  const breadCrumb = getBreadcrumb(categoryData, categoryId);
  console.log(tree, breadCrumb);

  return <UploadTemplate {...{ states, categoryData }} />;
}

UploadUpdate.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default UploadUpdate;
