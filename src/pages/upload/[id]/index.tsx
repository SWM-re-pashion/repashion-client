import { ReactElement, useCallback, useEffect } from 'react';

import { queryKey, QUERY_WEEKTIME } from '@constants/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import UploadTemplate from '@templates/UploadTemplate';
import { getCategory } from 'src/api/category';
import { withGetServerSideProps } from 'src/api/core/withGetServerSideProps';
import { getStaticData } from 'src/api/staticData';
import { getUploadedProduct } from 'src/api/upload';
import { useUploadedProduct } from 'src/hooks/api/upload';
import { useUploadUpdateStore } from 'src/store/upload/useUploadUpdateStore';
import { uploadedDataToState } from 'src/utils/upload.utils';

export const getServerSideProps = withGetServerSideProps(async ({ params }) => {
  const id = params?.id as string;
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(queryKey.category(false), () => getCategory(), {
    staleTime: QUERY_WEEKTIME,
  });
  await queryClient.fetchQuery(
    queryKey.staticData('Style'),
    () => getStaticData('Style'),
    {
      staleTime: QUERY_WEEKTIME,
    },
  );
  await queryClient.fetchQuery(
    queryKey.staticData('Color'),
    () => getStaticData('Color'),
    {
      staleTime: QUERY_WEEKTIME,
    },
  );
  await queryClient.fetchQuery(
    queryKey.staticData('Size'),
    () => getStaticData('Size'),
    {
      staleTime: QUERY_WEEKTIME,
    },
  );
  await queryClient.fetchQuery(
    queryKey.staticData('PollutionCondition'),
    () => getStaticData('PollutionCondition'),
    {
      staleTime: QUERY_WEEKTIME,
    },
  );
  await queryClient.fetchQuery(
    queryKey.staticData('Length'),
    () => getStaticData('Length'),
    {
      staleTime: QUERY_WEEKTIME,
    },
  );
  await queryClient.fetchQuery(
    queryKey.staticData('BodyShape'),
    () => getStaticData('BodyShape'),
    {
      staleTime: QUERY_WEEKTIME,
    },
  );
  await queryClient.fetchQuery(
    queryKey.staticData('Fit'),
    () => getStaticData('Fit'),
    {
      staleTime: QUERY_WEEKTIME,
    },
  );
  await queryClient.fetchQuery(
    queryKey.uploadedProduct(id),
    () => getUploadedProduct(id),
    {
      staleTime: QUERY_WEEKTIME,
    },
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
  const states = useUploadUpdateStore((state) => state);
  const { initState } = states;
  const initUploads = useCallback(initState, [initState]);
  const state = uploadedDataToState(data);

  useEffect(() => {
    if (state) initUploads(state);
  }, []);

  return <UploadTemplate {...{ id, states, isUpdate: true }} />;
}

UploadUpdate.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default UploadUpdate;
