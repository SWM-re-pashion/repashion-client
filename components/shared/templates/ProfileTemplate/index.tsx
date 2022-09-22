import Link from 'next/link';

import { Setting } from '@atoms/icon';
import { seoData } from '@constants/seo';
import { statusData } from '@constants/status';
import PageTemplate from '@templates/PageTemplate';
import StatusMenuList from 'components/MyPage/organisms/StatusMenuList';
import UserProfile from 'components/MyPage/organisms/UserProfile';
import ProductItemList from 'components/Shop/Organisms/ProductItemList';
import { useQueryRouter, useSearch } from 'hooks';

import $ from './style.module.scss';

type Props = {
  status: string | null;
  isMe: boolean;
  profile: {
    profileImg: string;
    nickname: string;
  };
  isNeedFooter: boolean;
};

function ProfileTemplate({ status, isMe, profile, isNeedFooter }: Props) {
  const statusQuery = useSearch('status');
  const queryStatus = useQueryRouter('status');
  const selectedMenu = statusQuery || status || statusData[0].code;

  return (
    <PageTemplate
      metaTitle="re:Fashion | 마이 페이지"
      metaUrl={`${seoData.url}/mypage`}
      title={`${isMe ? '내' : profile.nickname} 프로필`}
      right={
        isMe && (
          <Link href="/mypage/setting">
            <button
              type="button"
              className={$['setting-btn']}
              aria-label="설정 버튼"
            >
              <Setting />
            </button>
          </Link>
        )
      }
      outsideChildren={<ProductItemList paddingTop="0" paddingBottom="80px" />}
      isNeedFooter={isNeedFooter}
      sidePadding="23px"
    >
      <UserProfile profile={profile} totalDealNum={13} />

      <StatusMenuList
        data={statusData}
        selectedMenu={selectedMenu}
        onClick={queryStatus}
      />
    </PageTemplate>
  );
}

export default ProfileTemplate;
