import { useRouter } from 'next/router';

import { ReactElement, useCallback, useEffect } from 'react';

import { queryKey } from '@constants/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import UploadTemplate from '@templates/UploadTemplate';
import { getCategory } from 'src/api/category';
import { withGetServerSideProps } from 'src/api/core/withGetServerSideProps';
import { useCategoryTree } from 'src/hooks/api/category';
import { useUploadStore } from 'src/store/upload/useUploadStore';
import { toastError } from 'src/utils/toaster';
import { judgeValid } from 'src/utils/upload.utils';

export const getStaticProps = withGetServerSideProps(async () => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(queryKey.category(false), () => getCategory());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24, // 하루
  };
});

function Upload() {
  const router = useRouter();
  const categoryData = useCategoryTree(false)?.data;
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

  return (
    <UploadTemplate {...{ id: '-1', states, categoryData, isUpdate: false }} />
  );
}

Upload.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Upload;
