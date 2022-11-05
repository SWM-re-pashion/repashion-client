import { ProductBasicInfo, SaleStatusDataProp } from '#types/product';
import { StyleProps } from '#types/props';
import { useUpdateProductStatus } from 'src/hooks/api/product';
import { productBasicUtil } from 'src/utils/product';

import ProductBasicView from './ProductBasicView';

type Props = {
  id: string;
  basic: ProductBasicInfo;
  isMe: boolean;
  isSoldOut: boolean;
} & StyleProps;

export default function ProductBasic({ id, basic, isMe, isSoldOut }: Props) {
  const { title, classification } = basic;
  const { mutate } = useUpdateProductStatus(id);
  const handleStatusChange = (option: string) => mutate(id); // TODO: 추후에 판매 상태 추가 후 option param 활용
  const datas = productBasicUtil(basic);
  const saleStatus: SaleStatusDataProp = isSoldOut ? '판매완료' : '판매중';

  const props = {
    isMe,
    classification,
    title,
    datas,
    saleStatus,
    handleStatusChange,
  };

  return <ProductBasicView {...props} />;
}
