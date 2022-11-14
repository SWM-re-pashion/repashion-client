import Link from 'next/link';

import $ from './style.module.scss';

function MainHeader() {
  return (
    <div className={$['main-header']}>
      <h1 className={$.title}>re:Fashion</h1>
      <Link href="/login">
        <button type="button" aria-label="로그인 버튼" className={$.login}>
          로그인
        </button>
      </Link>
    </div>
  );
}

export default MainHeader;
