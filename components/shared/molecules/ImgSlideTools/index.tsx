import { useRouter } from 'next/router';

import { Arrow } from '@atoms/icon/Arrow';
import { More } from '@atoms/icon/More';

import $ from './style.module.scss';

export default function ImgSlideTools() {
  const router = useRouter();
  const handleClick = () => router.back();

  return (
    <article className={$['header-box']}>
      <Arrow className={$['back-btn']} onClick={handleClick} />
      <More className={$['more-btn']} />
    </article>
  );
}
