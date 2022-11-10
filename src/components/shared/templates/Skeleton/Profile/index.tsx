import classnames from 'classnames';
import $ from 'src/components/MyPage/organisms/UserProfile/style.module.scss';
import $$ from 'src/components/shared/molecules/Profile/style.module.scss';

import sklt from './style.module.scss';

function ProfileSkeleton() {
  return (
    <div className={$['profile-container']}>
      <div className={$['profile-info']}>
        <div className={sklt.text} />
        <div className={classnames($$.profile, sklt['skeleton-profile'])}>
          <div className={$$['profile-box']}>
            <div className={sklt['skeleton-img']} />
            <div className={classnames($$.nickname, sklt.text)} />
          </div>
        </div>
      </div>
      <div className={classnames($['total-deal'], sklt['skeleton-box'])} />
    </div>
  );
}

export default ProfileSkeleton;
