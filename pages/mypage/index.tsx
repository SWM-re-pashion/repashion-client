import { GetServerSidePropsContext } from 'next';

import { ReactElement } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { seoData } from '@constants/seo';
import { statusData } from '@constants/status';
import Footer from '@organisms/Footer';
import Layout from '@templates/Layout';
import StatusMenuList from 'components/MyPage/organisms/StatusMenuList';
import ProfileHeader from 'components/MyPage/organisms/ProfileHeader';
import UserProfile from 'components/MyPage/organisms/UserProfile';
import { useQueryRouter, useSearch } from 'hooks';

import $ from './style.module.scss';

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { status } = query;
  const statusQuery = (typeof status !== 'object' && status) || null;

  return {
    props: {
      status: statusQuery,
    },
  };
}

function MyPage({ status }: { status: string | null }) {
  const statusQuery = useSearch('status');
  const queryStatus = useQueryRouter('status');
  const selectedMenu = statusQuery || status || statusData[0].code;

  return (
    <>
      <HeadMeta
        title="re:Fashion | 마이 페이지"
        url={`${seoData.url}/mypage`}
      />
      <ProfileHeader nickname="bruney" isMe />
      <section className={$['mypage-body']}>
        <UserProfile
          profile={{
            profileImg:
              'https://user-images.githubusercontent.com/62797441/187207056-de246ecf-c46a-4a41-b7e6-8e3d760aae99.svg',
            nickname: 'bruney',
          }}
          totalDealNum={13}
        />

        <StatusMenuList
          data={statusData}
          selectedMenu={selectedMenu}
          onClick={queryStatus}
        />
      </section>
      <Footer />
    </>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default MyPage;
