import { useRouter } from 'next/router';

import { StyleProps } from '#types/props';
import { Arrow } from '@atoms/icon';

import Button from './Button';

type Props = {
  color?: string;
} & StyleProps;

export default function BackBtn({ className, color }: Props) {
  const router = useRouter();
  const handleClick = () => router.back();

  return (
    <Button onClick={handleClick} iconBtn>
      <Arrow color={color} className={className} />
    </Button>
  );
}
