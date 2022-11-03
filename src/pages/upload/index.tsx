import { useRouter } from 'next/router';

import { ReactElement, useCallback, useEffect } from 'react';

import Loading from '@atoms/Loading';
import { ISR_WEEK } from '@constants/api';
import { queryKey } from '@constants/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import UploadTemplate from '@templates/UploadTemplate';
import { getCategory } from 'src/api/category';
import { getStaticData } from 'src/api/staticData';
import { useAuthTest } from 'src/hooks/api/login';
import { useUploadStore } from 'src/store/upload/useUploadStore';
import { toastError } from 'src/utils/toaster';
import { judgeValid } from 'src/utils/upload.utils';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(queryKey.category(false), () => getCategory());
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

function Upload() {
  const router = useRouter();
  const { isSuccess } = useAuthTest();
  const states = useUploadStore((state) => state);
  const { isRemainState } = judgeValid(states);

  const backBtnClick = useCallback(() => {
    if (isRemainState && isSuccess) {
      toastError({ message: '상품이 임시저장되었습니다.' });
    }
  }, [isRemainState, isSuccess]);

  useEffect(() => {
    router.events.on('routeChangeStart', backBtnClick);
    return () => {
      router.events.off('routeChangeStart', backBtnClick);
    };
  }, [backBtnClick, router.events, router.pathname]);

  if (isSuccess)
    return <UploadTemplate {...{ id: '-1', states, isUpdate: false }} />;
  return <Loading style={{ height: 'calc(var(--vh, 1vh) * 100)' }} />;
}

Upload.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Upload;
