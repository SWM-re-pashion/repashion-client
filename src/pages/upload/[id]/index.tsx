import { GetStaticPropsContext } from 'next';

import { ReactElement, useCallback, useEffect } from 'react';

import Loading from '@atoms/Loading';
import { ISR_WEEK } from '@constants/api';
import { queryKey } from '@constants/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import UploadTemplate from '@templates/UploadTemplate';
import { getSelectedCategory } from 'src/api/category';
import { getStaticData } from 'src/api/staticData';
import { useUploadedProduct } from 'src/hooks/api/upload';
import { useUploadUpdateStore } from 'src/store/upload/useUploadUpdateStore';
import { uploadedDataToState } from 'src/utils/upload.utils';

export const getStaticPaths = async () => {
  const paths = Array.from({ length: 10 }, (_, i) => ({
    params: { id: `${i + 1}` },
  }));
  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = params?.id as string;
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(queryKey.category(true), () =>
    getSelectedCategory(true),
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
  await queryClient.fetchQuery(queryKey.staticData('PollutionCondition'), () =>
    getStaticData('PollutionCondition'),
  );
  await queryClient.fetchQuery(queryKey.staticData('Length'), () =>
    getStaticData('Length'),
  );
  await queryClient.fetchQuery(queryKey.staticData('BodyShape'), () =>
    getStaticData('BodyShape'),
  );
  await queryClient.fetchQuery(queryKey.staticData('Fit'), () =>
    getStaticData('Fit'),
  );

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: ISR_WEEK,
  };
};

function UploadUpdate({ id }: { id: string }) {
  const { data, isSuccess } = useUploadedProduct(id);
  const states = useUploadUpdateStore((state) => state);
  const { initState } = states;
  const initUploads = useCallback(initState, [initState]);
  const state = uploadedDataToState(data);

  useEffect(() => {
    if (data && state) initUploads(state);
  }, [data]);

  if (isSuccess) return <UploadTemplate {...{ id, states, isUpdate: true }} />;
  return <Loading style={{ height: 'calc(var(--vh, 1vh) * 100)' }} />;
}

UploadUpdate.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default UploadUpdate;
