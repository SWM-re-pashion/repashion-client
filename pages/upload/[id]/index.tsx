import { useRouter } from 'next/router';

import { ReactElement, useCallback, useEffect } from 'react';

import { queryKey } from '@constants/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import UploadTemplate from '@templates/UploadTemplate';
import { getCategory } from 'api/category';
import { withGetServerSideProps } from 'api/core/withGetServerSideProps';
import { getUploadedProduct } from 'api/product';
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
  console.log(data);
  const router = useRouter();
  const states = useUploadUpdateStore((state) => state);

  return <UploadTemplate {...{ states }} />;
}

UploadUpdate.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default UploadUpdate;
