import Link from 'next/link';

import BackBtn from '@atoms/BackBtn';
import { Setting } from '@atoms/icon';
import Span from '@atoms/Span';
import { seoData } from '@constants/seo';
import { statusData } from '@constants/status';
import PageTemplate from '@templates/PageTemplate';
import StatusMenuList from 'src/components/MyPage/organisms/StatusMenuList';
import UserProfile from 'src/components/MyPage/organisms/UserProfile';
import { useQueryRouter, useSearch } from 'src/hooks';

import $ from './style.module.scss';

type Props = {
  status?: string;
  isMe: boolean;
  totalCount: number;
  isNeedFooter: boolean;
};

function ProfileTemplate(profileProps: Props) {
  const { status, isMe, isNeedFooter, totalCount } = profileProps;
  const statusQuery = useSearch('status');
  const queryStatus = useQueryRouter('status');
  const replaceStatus = useQueryRouter('status', 'REPLACE');
  const selectedMenu = statusQuery || status || statusData[0].code;
  const statusQueryFunc = statusQuery ? replaceStatus : queryStatus;

  return (
    <PageTemplate
      metaTitle="re:Fashion | 마이 페이지"
      metaUrl={`${seoData.url}/mypage`}
      title={`${isMe ? '내' : '다른 사용자'} 프로필`}
      left={<BackBtn color="#000" />}
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
      outsideChildren={
        <div className={$.prepare}>
          <Span>서비스 준비중입니다.</Span>
        </div>
      }
      isNeedFooter={isNeedFooter}
      paddingTop="84px"
      sidePadding="23px"
    >
      <UserProfile totalCount={totalCount} />

      <StatusMenuList
        data={statusData}
        selectedMenu={selectedMenu}
        onClick={statusQueryFunc}
      />
    </PageTemplate>
  );
}

export default ProfileTemplate;
