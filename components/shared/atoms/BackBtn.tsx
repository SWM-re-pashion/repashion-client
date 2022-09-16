import { useRouter } from 'next/router';

import { useCallback } from 'react';

import { StyleProps } from '#types/props';
import { Arrow } from '@atoms/icon';

import Button from './Button';

type Props = {
  color?: string;
  url?: string;
} & StyleProps;

export default function BackBtn({ className, color, url }: Props) {
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (url) router.replace(url);
    else router.back();
  }, [router, url]);

  return (
    <Button onClick={handleClick} iconBtn>
      <Arrow color={color} className={className} />
    </Button>
  );
}
