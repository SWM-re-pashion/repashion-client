import { ReactElement } from 'react';

import Loading from '@atoms/Loading';
import { ISR_WEEK } from '@constants/api';
import { queryKey } from '@constants/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@templates/Layout';
import UploadTemplate from '@templates/UploadTemplate';
import { getSelectedCategory } from 'src/api/category';
import { getStaticData } from 'src/api/staticData';
import ContinueWriteModal from 'src/components/Upload/organisms/ContinueWriteModal';
import { useAuthTest } from 'src/hooks/api/login';

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

function Upload() {
  const { isSuccess } = useAuthTest();

  if (!isSuccess)
    return <Loading style={{ height: 'calc(var(--vh, 1vh) * 100)' }} />;
  return (
    <>
      <ContinueWriteModal />
      <UploadTemplate {...{ id: '-1', isUpdate: false }} />
    </>
  );
}

Upload.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Upload;
