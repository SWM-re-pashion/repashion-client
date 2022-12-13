import { useRouter } from 'next/router';

import BaseImage from '@atoms/BaseImage';
import HeadMeta from '@atoms/HeadMeta';
import { NOTFOUND_IMAGE } from '@constants/img';

import $ from './style.module.scss';

type Props = {
  title?: string;
  img?: string;
  alt?: string;
};

function NotFound(props: Props) {
  const { title, img, alt } = props;
  const router = useRouter();
  const handleClick = () => router.back();

  return (
    <>
      <HeadMeta title={`re:Fashion | ${title || '404 Not Found'}`} />
      <section className={$['not-found']}>
        <div className={$['img-box']}>
          <BaseImage
            src={img || NOTFOUND_IMAGE}
            alt={alt || '404 Not Found'}
            width={400}
            height={220}
          />
        </div>
        <button type="button" className={$['go-back']} onClick={handleClick}>
          이전 페이지로 돌아가기
        </button>
      </section>
    </>
  );
}

export default NotFound;
