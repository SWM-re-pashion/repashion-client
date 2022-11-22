import { NoProduct } from '@atoms/icon';

import $ from './style.module.scss';

type Props = {
  isNoProducts: boolean;
  isFetching: boolean;
  isLoading: boolean;
  height?: string;
};

function NoProductView({ isNoProducts, isLoading, isFetching, height }: Props) {
  return (
    (!isLoading && !isFetching && isNoProducts && (
      <div className={$['no-products']} style={{ height }}>
        <NoProduct />
      </div>
    )) ||
    null
  );
}

export default NoProductView;
