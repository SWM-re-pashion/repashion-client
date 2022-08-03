import { useRouter } from 'next/router';

import { StyleProps } from '#types/props';
import { Arrow } from '@atoms/icon';

import Button from './Button';

export default function BackBtn({ className }: StyleProps) {
  const router = useRouter();
  const handleClick = () => router.back();

  return (
    <Button onClick={handleClick} iconBtn>
      <Arrow className={className} />
    </Button>
  );
}
