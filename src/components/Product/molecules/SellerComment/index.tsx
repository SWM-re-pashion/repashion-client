import { StyleProps } from '#types/props';
import BorderBox from '@atoms/BorderBox';
import { SmallTriangle } from '@atoms/icon/SmallTriangle';
import ProfileImg from '@atoms/ProfileImg';
import StrongLabel from 'src/components/Product/atoms/StrongLabel';

import $ from './style.module.scss';

type Props = {
  opinion: string;
  src: string;
} & StyleProps;

export default function SellerComment({ opinion, src }: Props) {
  return (
    <article className={$['seller-comment']}>
      <div className={$['seller-comment-container']}>
        <BorderBox className={$['seller-comment-box']}>
          <StrongLabel label="판매자의 한마디" />
          <span>{opinion}</span>
        </BorderBox>
        <SmallTriangle className={$.icon} />
      </div>

      <ProfileImg src={src} alt="사용자 프로필" className={$['profile-img']} />
    </article>
  );
}
