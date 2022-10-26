import { useCallback } from 'react';

import { ImgProps } from '#types/index';
import ImgSlideTools from '@molecules/ImgSlideTools';
import ImgSlide from '@organisms/ImgSlide';
import { useDeleteProduct } from 'src/hooks/api/product';
import { toastError } from 'src/utils/toaster';

type Props = {
  id: string;
  isMe: boolean;
  isSoldOut: boolean;
  imgList: (ImgProps | string)[];
};

function ProductImgSlide(slideProps: Props) {
  const { id, isMe, imgList, isSoldOut } = slideProps;
  const { mutate } = useDeleteProduct(id);
  const deleteProduct = useCallback(() => mutate(id), [id, mutate]);
  const updateDate = useCallback(
    () => toastError({ message: '준비중입니다.' }),
    [],
  );
  const updateProduct = useCallback(
    () => toastError({ message: '준비중입니다.' }),
    [],
  );
  const report = useCallback(
    () => toastError({ message: '준비중입니다.' }),
    [],
  );

  const myMoreMenu = [
    { name: '끌어올리기', onClick: updateDate },
    { name: '수정하기', onClick: updateProduct },
    { name: '삭제하기', onClick: deleteProduct },
  ];

  const notMyMoreMenu = [{ name: '신고하기', onClick: report }];

  const options = isMe ? myMoreMenu : notMyMoreMenu;

  return (
    <ImgSlide {...{ isSoldOut }} imgList={imgList}>
      <ImgSlideTools options={options} />
    </ImgSlide>
  );
}

export default ProductImgSlide;
