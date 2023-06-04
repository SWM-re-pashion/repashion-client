import { useRouter } from 'next/router';

import { useCallback, useEffect } from 'react';

import { useUploadStore } from 'src/store/upload/useUploadStore';
import { toastError } from 'src/utils/toaster';

export function useUploadRemained() {
  const { validation, style, isIncludeDelivery, basicInfo, sellerNote } =
    useUploadStore((state) => state);
  const { imgList, price, size, contact } = validation;
  const validationRemain =
    imgList || price || size || contact || isIncludeDelivery;
  const styleRemain = !!style.color.length || !!style.tag || !!style.material;
  const basicRemain =
    !!basicInfo.category.some((x) => !!x) || !!basicInfo.brand;
  const sellerNoteRemain = Object.values(sellerNote).some((x) => !!x);
  return validationRemain || styleRemain || basicRemain || sellerNoteRemain;
}

export function useRouteChange(isRemained: boolean) {
  const router = useRouter();
  const backBtnClick = useCallback(() => {
    if (isRemained) toastError({ message: '상품이 임시저장되었습니다.' });
  }, [isRemained]);

  useEffect(() => {
    router.events.on('routeChangeStart', backBtnClick);
    return () => {
      router.events.off('routeChangeStart', backBtnClick);
    };
  }, [backBtnClick, router.events, router.pathname]);
}
