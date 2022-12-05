import { useRouter } from 'next/router';

import { useCallback } from 'react';

import { StyleProps } from '#types/props';
import { Arrow } from '@atoms/icon';

import Button from '../Button';

type Props = {
  color?: string;
  url?: string;
  onClick?: () => void;
} & StyleProps;

function BackBtn({ className, color, url, onClick }: Props) {
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
      return;
    }
    if (url) router.replace(url);
    else router.back();
  }, [onClick, router, url]);

  return (
    <Button onClick={handleClick} iconBtn>
      <Arrow color={color} className={className} />
    </Button>
  );
}
export default BackBtn;
