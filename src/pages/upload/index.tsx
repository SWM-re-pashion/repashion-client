import { useRouter } from 'next/router';

import { ReactElement, useCallback, useEffect } from 'react';

import { ISR_WEEK } from '@constants/api';
import { queryKey } from '@constants/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import UploadTemplate from '@templates/UploadTemplate';
import { getCategory } from 'src/api/category';
import { withGetServerSideProps } from 'src/api/core/withGetServerSideProps';
import { getStaticData } from 'src/api/staticData';
import { useUploadStore } from 'src/store/upload/useUploadStore';
import { toastError } from 'src/utils/toaster';
import { judgeValid } from 'src/utils/upload.utils';

export const getStaticProps = withGetServerSideProps(async () => {
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
});

function Upload() {
  const router = useRouter();
  const states = useUploadStore((state) => state);
  const { isRemainState } = judgeValid(states);

  const backBtnClick = useCallback(() => {
    if (isRemainState) {
      toastError({ message: '상품이 임시저장되었습니다.' });
    }
  }, [isRemainState]);

  useEffect(() => {
    router.events.on('routeChangeStart', backBtnClick);
    return () => {
      router.events.off('routeChangeStart', backBtnClick);
    };
  }, [backBtnClick, router.events, router.pathname]);

  return <UploadTemplate {...{ id: '-1', states, isUpdate: false }} />;
}

Upload.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Upload;
