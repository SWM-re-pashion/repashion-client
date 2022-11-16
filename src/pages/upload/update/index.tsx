import { useRouter } from 'next/router';

import { ReactElement, useCallback, useEffect } from 'react';

import Loading from '@atoms/Loading';
import { ISR_WEEK } from '@constants/api';
import { queryKey } from '@constants/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import UploadTemplate from '@templates/UploadTemplate';
import { getSelectedCategory } from 'src/api/category';
import { getStaticData } from 'src/api/staticData';
import { useSearch } from 'src/hooks';
import { useUploadedProduct } from 'src/hooks/api/upload';
import { useUploadUpdateStore } from 'src/store/upload/useUploadUpdateStore';
import { toastError } from 'src/utils/toaster';
import { uploadedDataToState } from 'src/utils/upload.utils';

export const getStaticProps = async () => {
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
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: ISR_WEEK,
  };
};

function UploadUpdate() {
  const { replace } = useRouter();
  const id = useSearch('id');
  const { data, isSuccess } = useUploadedProduct(id);
  const states = useUploadUpdateStore((state) => state);
  const { initState } = states;
  const initUploads = useCallback(initState, [initState]);
  const state = uploadedDataToState(data);

  useEffect(() => {
    if (data && state) initUploads(state);
  }, [data]);

  useEffect(() => {
    if (!id) {
      replace('/404');
      toastError({ message: '잘못된 상품 id값입니다.' });
    }
  }, [id]);

  if (isSuccess) return <UploadTemplate {...{ id, states, isUpdate: true }} />;
  return <Loading style={{ height: 'calc(var(--vh, 1vh) * 100)' }} />;
}

UploadUpdate.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default UploadUpdate;
