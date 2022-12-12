import Link from 'next/link';

import ErrorFallback from '@organisms/ErrorFallback';
import AsyncBoundary from '@templates/AsyncBoundary';

import UserDropDown from '../UserDropDown';
import $ from './style.module.scss';

function MainHeader() {
  const LoginBtn = (
    <Link href="/login">
      <button type="button" aria-label="로그인 버튼" className={$.login}>
        로그인
      </button>
    </Link>
  );

  const UserSkeleton = <div className={$['user-skeleton']} />;

  return (
    <div className={$['main-header']}>
      <div className={$['main-header-wrapper']}>
        <h1 className={$.title}>re:Fashion</h1>
        <AsyncBoundary
          suspenseFallback={UserSkeleton}
          errorFallback={ErrorFallback}
          otherRenderComponent={LoginBtn}
          includedStatusCodes={[401, 403]}
        >
          <UserDropDown />
        </AsyncBoundary>
      </div>
    </div>
  );
}

export default MainHeader;
