import Span from '@atoms/Span';

import $ from './style.module.scss';

type Props = {
  isNoProducts: boolean;
  isFetching: boolean;
  isLoading: boolean;
};

function NoProductView({ isNoProducts, isLoading, isFetching }: Props) {
  return (
    (!isLoading && !isFetching && !isNoProducts && (
      <div className={$['no-products']}>
        <Span>상품 결과가 없습니다.</Span>
      </div>
    )) ||
    null
  );
}

export default NoProductView;
