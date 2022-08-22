import { useRouter } from 'next/router';

import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import BackBtn from '@atoms/BackBtn';
import ButtonFooter from '@atoms/ButtonFooter';
import PageHeader from '@molecules/PageHeader';
import InfoBtnBox from '@organisms/InfoBtnBox';
import Layout from '@templates/Layout';
import { useProductUpload } from 'api/upload';
import AdditionInfo from 'components/Upload/organisms/AdditionInfo';
import Basic from 'components/Upload/organisms/Basic';
import ImgUpload from 'components/Upload/organisms/ImgUpload';
import MeasureInfo from 'components/Upload/organisms/MeasureInfo';
import Price from 'components/Upload/organisms/Price';
import SellerReview from 'components/Upload/organisms/SellerReview';
import StyleSelect from 'components/Upload/organisms/StyleSelect';
import { useMounted, useDidMountEffect } from 'hooks';
import { useUploadStore } from 'store/useUploadStore';
import { arrToString, getJudgeCategory, getMeasureElement } from 'utils';

import { additionData, styleData } from './constants';
import $ from './style.module.scss';
import { reviewData, sizeData } from './utils';

function Upload() {
  const router = useRouter();
  const states = useUploadStore((state) => state);
  const categories = states.basicInfo.category;
  const [_, mainCategoryState] = categories;
  const strCategory = arrToString(categories);
  const mainCategory = mainCategoryState || 'top';
  const size = sizeData(mainCategory);
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
  const bodyShape = 'normal'; // Todo: 서버에서 받은 height, bodyShape 상태 저장하기

  const handleSubmit = () => {
    mutate(states, {
      onSuccess: ({ data }) => {
        states.clearUpload();
        router.push(`/shop/${data}`);
      },
    });
  };

  useEffect(() => {
    setJudgeMeasure(getJudgeCategory(strCategory));
  }, [strCategory]);

  useDidMountEffect(() => {
    clearMeasure();
  }, [clearMeasure, judgeMeasure]); // Fix: restrictMode로 인해 실행됨.

  if (!isMounted) return null;
  return (
    <>
      <PageHeader
        title="상품등록"
        left={<BackBtn color="#000" className={$.back} />}
      />
      <div className={$.upload}>
        <ImgUpload
          dispatch={imgUpload}
          state={states}
          remove={removeImg}
          onChange={updateUpload}
        />
        <StyleSelect
          data={styleData}
          state={states.style}
          onChange={updateUpload}
        />
        <Price
          delivery={states.isIncludeDelivery}
          state={states.price}
          onChange={updateUpload}
        />
        <Basic
          state={states.basicInfo}
          onChange={updateUpload}
          {...{ dialogOpen, openDialog, closeDialog }}
        />
        <InfoBtnBox
          {...size}
          key={size.label}
          compareData={states[size.type]}
          handleFunc={updateUpload}
        />
        <SellerReview
          {...{ height, bodyShape }}
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
          opinionPlaceholder="추가적인 설명은 구매에 도움이 됩니다.(최대 300자)"
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
  return (
    <Layout noPadding decreaseHeight={80}>
      {page}
    </Layout>
  );
};

export default Upload;
