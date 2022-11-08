import Image from 'next/image';
import { useRouter } from 'next/router';

import HeadMeta from '@atoms/HeadMeta';
import { IMAGE_BLUR_DATA_URL } from '@constants/img';

import $ from './style.module.scss';

function NotFound() {
  const router = useRouter();
  const handleClick = () => router.back();

  return (
    <>
      <HeadMeta title="re:Fashion | 404 Not Found" />
      <section className={$['not-found']}>
        <div className={$['img-box']}>
          <Image
            src="https://user-images.githubusercontent.com/62797441/187207056-de246ecf-c46a-4a41-b7e6-8e3d760aae99.svg"
            alt="404 Not Found"
            width="400"
            height="220"
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_DATA_URL}
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
