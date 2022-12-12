import Link from 'next/link';

import BackBtn from '@atoms/BackBtn';
import { Setting } from '@atoms/icon';
import { seoData } from '@constants/seo';
import { statusData } from '@constants/status';
import ErrorFallback from '@organisms/ErrorFallback';
import AsyncBoundary from '@templates/AsyncBoundary';
import PageTemplate from '@templates/PageTemplate';
import StatusMenuList from 'src/components/MyPage/organisms/StatusMenuList';
import UserProfile from 'src/components/MyPage/organisms/UserProfile';
import ProfileSkeleton from 'src/components/MyPage/organisms/UserProfile/Skeleton';
import { useQueryRouter, useSearch } from 'src/hooks';

type Props = {
  id?: string;
  status?: string;
  isMe: boolean;
  isNeedFooter: boolean;
};

function ProfileTemplate(profileProps: Props) {
  const { id, status, isMe, isNeedFooter } = profileProps;
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
      isNeedFooter={isNeedFooter}
      paddingTop="84px"
      left={<BackBtn color="#000" />}
      right={
        isMe && (
          <Link href="/mypage/setting">
            <button type="button" aria-label="설정 버튼">
              <Setting />
            </button>
          </Link>
        )
      }
    >
      <AsyncBoundary
        suspenseFallback={<ProfileSkeleton />}
        errorFallback={ErrorFallback}
      >
        <UserProfile userId={id} isMe={isMe} />
      </AsyncBoundary>

      <StatusMenuList
        isMe={isMe}
        data={statusData}
        selectedMenu={selectedMenu}
        onClick={statusQueryFunc}
      />
    </PageTemplate>
  );
}

export default ProfileTemplate;
