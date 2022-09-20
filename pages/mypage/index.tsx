import { ReactElement } from 'react';

import HeadMeta from '@atoms/HeadMeta';
import { seoData } from '@constants/seo';
import Footer from '@organisms/Footer';
import Layout from '@templates/Layout';
import ProfileHeader from 'components/MyPage/organisms/ProfileHeader';
import UserProfile from 'components/MyPage/organisms/UserProfile';

import $ from './style.module.scss';

function MyPage() {
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
      </section>
      <Footer />
    </>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default MyPage;
