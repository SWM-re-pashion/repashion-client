import { memo } from 'react';

import Button from '@atoms/Button';
import { Setting } from '@atoms/icon';
import Span from '@atoms/Span';
import { StyleProps } from 'types/props';

import $ from './style.module.scss';

type Props = {
  nickname: string;
  isMe: boolean;
} & StyleProps;

function ProfileHeader(headerProps: Props) {
  const { nickname, isMe } = headerProps;
  return (
    <header className={$['profile-header']}>
      <div className={$['profile-header-wrapper']}>
        <Span fontSize={18} className={$['profile-name']}>
          {isMe ? '내' : nickname} 프로필
        </Span>
        {isMe && (
          <Button iconBtn className={$['setting-btn']}>
            <Setting />
          </Button>
        )}
      </div>
    </header>
  );
}

export default memo(ProfileHeader);
