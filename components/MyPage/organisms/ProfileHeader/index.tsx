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
    <header className={$['profile-header']} aria-label="프로필 헤더 바">
      <div className={$['profile-header-wrapper']}>
        <Span fontSize={18} className={$['profile-name']}>
          {isMe ? '내' : nickname} 프로필
        </Span>
        {isMe && (
          <Button iconBtn className={$['setting-btn']} label="설정 버튼">
            <Setting />
          </Button>
        )}
      </div>
    </header>
  );
}

export default memo(ProfileHeader);
