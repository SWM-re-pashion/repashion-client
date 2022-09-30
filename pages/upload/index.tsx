import { useRouter } from 'next/router';

import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';

import BackBtn from '@atoms/BackBtn';
import ButtonFooter from '@atoms/ButtonFooter';
import HeadMeta from '@atoms/HeadMeta';
import PageHeader from '@molecules/PageHeader';
import Layout from '@templates/Layout';
import { getCategoryData, useCategoryTree } from 'api/getCategoryData';
import { useProductUpload } from 'api/upload';
import AdditionInfo from 'components/Upload/organisms/AdditionInfo';
import Basic from 'components/Upload/organisms/Basic';
import ContinueWriteModal from 'components/Upload/organisms/ContinueWriteModal';
import ImgUpload from 'components/Upload/organisms/ImgUpload';
import MeasureInfo from 'components/Upload/organisms/MeasureInfo';
import Price from 'components/Upload/organisms/Price';
import SellerReview from 'components/Upload/organisms/SellerReview';
import SizeInfo from 'components/Upload/organisms/SizeInfo';
import StyleSelect from 'components/Upload/organisms/StyleSelect';
import { seoData } from 'constants/seo';
import { useMounted, useDidMountEffect } from 'hooks';
import { useUploadStore } from 'store/useUploadStore';
import { arrToString, getJudgeCategory, getMeasureElement } from 'utils';
import { toastError, toastSuccess } from 'utils/toaster';

import { additionData, styleData } from '../../constants/upload/constants';
import { reviewData, sizeData } from '../../constants/upload/utils';
import $ from './style.module.scss';

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('category', () => getCategoryData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Upload() {
  const router = useRouter();
  const categoryData = useCategoryTree()?.data;
  const states = useUploadStore((state) => state);
  const { price, isIncludeDelivery, sellerNote, style, basicInfo, size } =
    states;
  const { color, tag, material } = style;
  const { title, category, brand } = basicInfo;

  const [_, mainCategoryState] = category;
  const strCategory = arrToString(category);
  const mainCategory = mainCategoryState || 'top';
  const sizeProps = sizeData(mainCategory);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [judgeMeasure, setJudgeMeasure] = useState(
    getJudgeCategory(strCategory),
  );
  const isMounted = useMounted();
  const { mutate } = useProductUpload();
  const openDialog = useCallback(() => setDialogOpen(true), []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);
  const imgUpload = useUploadStore(useCallback((state) => state.imgUpload, []));
  const removeImg = useUploadStore(useCallback((state) => state.removeImg, []));
  const clearMeasure = useUploadStore(
    useCallback((state) => state.clearMeasure, []),
  );
  const updateUpload = useUploadStore(
    useCallback((state) => state.updateUpload, []),
  );
  const review = useMemo(() => reviewData(mainCategory), [mainCategory]);
  const measureData = useMemo(
    () => getMeasureElement(judgeMeasure),
    [judgeMeasure],
  );

  const height = 170;
  const bodyShape = 'normal'; // TODO: 서버에서 받은 height, bodyShape 상태 저장하기

  const isImgValid = !!states.imgList.length;
  const isStyleValid = !!color.length && !!tag && !!material;
  const isPriceValid = !!price && isIncludeDelivery;
  const isBasicValid = !!title && !!brand && category.every((x) => !!x);
  const isSellerValid = Object.values(sellerNote).every((x) => !!x);
  const isSizeValid = !!size;

  const isPartialValid = isImgValid && isStyleValid && isPriceValid;
  const isFormValid =
    isPartialValid && isBasicValid && isSellerValid && isSizeValid;

  const handleSubmit = () => {
    if (isFormValid) {
      mutate(states, {
        onSuccess: ({ data }) => {
          router.push(`/shop/${data}`);
          states.clearUpload();
          toastSuccess({ message: '상품 등록에 성공했습니다.' });
        },
      });
    } else {
      toastError({ message: '필수 정보를 알려주세요.' });
    }
  };

  useEffect(() => {
    setJudgeMeasure(getJudgeCategory(strCategory));
  }, [strCategory]);

  useDidMountEffect(() => {
    clearMeasure();
  }, [clearMeasure, judgeMeasure]); // FIX: restrictMode로 인해 실행됨.

  if (!isMounted || !categoryData) return null;
  return (
    // TODO: form 태그로 바꾸기
    <>
      <HeadMeta
        title="re:Fashion | 상품 등록하기"
        url={`${seoData.url}/upload`}
      />

      <ContinueWriteModal isRemainState />

      <PageHeader
        title="상품등록"
        left={<BackBtn color="#000" className={$.back} />}
      />
      <div className={$.upload}>
        <ImgUpload
          {...{ isImgValid }}
          dispatch={imgUpload}
          state={states.imgList}
          remove={removeImg}
          onChange={updateUpload}
        />
        <StyleSelect
          {...{ isStyleValid }}
          data={styleData}
          state={style}
          onChange={updateUpload}
        />
        <Price
          {...{ isPriceValid }}
          delivery={isIncludeDelivery}
          state={price}
          onChange={updateUpload}
        />
        <Basic
          {...{ isBasicValid }}
          state={basicInfo}
          onChange={updateUpload}
          {...{ dialogOpen, openDialog, closeDialog, categoryData }}
        />
        <SizeInfo
          {...{ isSizeValid }}
          sizeProps={sizeProps}
          state={size}
          onChange={updateUpload}
        />
        <SellerReview
          {...{ height, bodyShape, isSellerValid }}
          data={review}
          state={states.sellerNote}
          onChange={updateUpload}
        />
        <MeasureInfo
          data={measureData}
          state={states.measure}
          onChange={updateUpload}
        />
        <AdditionInfo
          data={additionData}
          additionState={states.additionalInfo}
          opinionState={states.opinion}
          opinionPlaceholder="판매자님의 설명은 구매에 도움이 됩니다.(최대 300자)"
          onChange={updateUpload}
        />
      </div>
      <ButtonFooter
        background="white"
        style={{ padding: '0 21px 30px' }}
        onClick={handleSubmit}
      >
        올리기
      </ButtonFooter>
    </>
  );
}

Upload.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Upload;
