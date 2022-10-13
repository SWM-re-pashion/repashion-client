import { ReactElement, useCallback, useEffect } from 'react';

import { queryKey } from '@constants/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import UploadTemplate from '@templates/UploadTemplate';
import { getCategory } from 'api/category';
import { withGetServerSideProps } from 'api/core/withGetServerSideProps';
import { getUploadedProduct } from 'api/upload';
import { useCategoryTree } from 'hooks/api/category';
import { useUploadedProduct } from 'hooks/api/upload';
import { useUploadUpdateStore } from 'store/upload/useUploadUpdateStore';
import { uploadedDataToState } from 'utils/upload.utils';

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
  const states = useUploadUpdateStore((state) => state);
  const { initState } = states;
  const initUploads = useCallback(initState, [initState]);
  const state = uploadedDataToState(data);

  useEffect(() => {
    if (state) initUploads(state);
  }, []);

  if (!categoryData || !data) return null;
  return <UploadTemplate {...{ id, states, categoryData, isUpdate: true }} />;
}

UploadUpdate.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default UploadUpdate;
