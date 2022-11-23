import { useCallback } from 'react';

import SellerComment from 'src/components/Product/molecules/SellerComment';
import ProductBasic from 'src/components/Product/organisms/ProductBasic';
import ProductFooter from 'src/components/Product/organisms/ProductFooter';
import ProductImgSlide from 'src/components/Product/organisms/ProductImgSlide';
import ProductNotice from 'src/components/Product/organisms/ProductNotice';
import ProductSize from 'src/components/Product/organisms/ProductSize';
import ProfileInfo from 'src/components/Product/organisms/ProfileInfo';
import { useProdutDetail } from 'src/hooks/api/product';
import { useSearchStore } from 'src/store/useSearchStore';

import $ from './style.module.scss';

function ProductDetail({ id }: { id: string }) {
  const { data } = useProdutDetail(id);
  const addProduct = useSearchStore(
    useCallback((state) => state.addProduct, []),
  );
  const detailData = data?.data;

  if (!detailData) return null;

  const { isMe, isSoldOut, sellerInfo, basic, sellerNotice } = detailData;
  const { measure, opinion, price, isIncludeDelivery } = detailData;
  const { updatedAt, like, view, contact } = detailData;
  const { userId, profileImg: profileImage, nickname: name } = sellerInfo;
  addProduct({ id: +id, img: sellerInfo.image[0] });
  // const status = 'soldout'; // TODO: 백엔드와 협의, 추후에 상품 상태 추가

  // useEffect(() => {
  //   if (sellerInfo.image[0]) addProduct({ id: +id, img: sellerInfo.image[0] });
  // }, []);

  return (
    <>
      <ProductImgSlide
        {...{ id, isMe, isSoldOut, imgList: sellerInfo.image }}
      />
      <ProfileInfo {...{ userId, profileImage, name, title: basic.title }} />

      <section className={$['shop-detail-info']}>
        <ProductBasic basic={basic} {...{ id, isMe, isSoldOut }} />
        <ProductNotice sellerNotice={sellerNotice} />
        {measure && <ProductSize size={measure} kind={basic.classification} />}
        {opinion && (
          <SellerComment opinion={opinion} src={sellerInfo.profileImg} />
        )}

        <ProductFooter
          footer={{
            ...{ price, isIncludeDelivery, updatedAt },
            ...{ like, view, contact },
          }}
        >
          연락하기
        </ProductFooter>
      </section>
    </>
  );
}

export default ProductDetail;
