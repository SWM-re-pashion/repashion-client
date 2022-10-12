import { useRouter } from 'next/router';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { MeasureType, UploadStoreState } from '#types/storeType/upload';
import BackBtn from '@atoms/BackBtn';
import ButtonFooter from '@atoms/ButtonFooter';
import HeadMeta from '@atoms/HeadMeta';
import { additionData, styleData } from '@constants/upload/constants';
import { reviewData, sizeData } from '@constants/upload/utils';
import PageHeader from '@molecules/PageHeader';
import AdditionInfo from 'components/Upload/organisms/AdditionInfo';
import Basic from 'components/Upload/organisms/Basic';
import Contact from 'components/Upload/organisms/Contact';
import ContinueWriteModal from 'components/Upload/organisms/ContinueWriteModal';
import ImgUpload from 'components/Upload/organisms/ImgUpload';
import MeasureInfo from 'components/Upload/organisms/MeasureInfo';
import Price from 'components/Upload/organisms/Price';
import SellerReview from 'components/Upload/organisms/SellerReview';
import SizeInfo from 'components/Upload/organisms/SizeInfo';
import StyleSelect from 'components/Upload/organisms/StyleSelect';
import { seoData } from 'constants/seo';
import { useMounted, useDidMountEffect } from 'hooks';
import { useCategoryTree } from 'hooks/api/category';
import { useProductUpload } from 'hooks/api/upload';
import { arrToString, getJudgeCategory, getMeasureElement } from 'utils';
import { toastError, toastSuccess } from 'utils/toaster';
import { judgeValid, refineUploadData } from 'utils/upload.utils';

import $ from './style.module.scss';

type Props = {
  states: UploadStoreState;
};

function UploadTemplate({ states }: Props) {
  const router = useRouter();
  const categoryData = useCategoryTree(false)?.data;
  const isMounted = useMounted();
  const { mutate } = useProductUpload();
  const { price, isIncludeDelivery, style, basicInfo, size, contact } = states;
  const { clearMeasure, updateUpload, removeImg, imgUpload, clearUpload } =
    states;
  const { category } = basicInfo;

  const judgedState = judgeValid(states);
  const { isImgValid, isBasicValid, isPriceValid } = judgedState;
  const { isSellerValid, isContactValid } = judgedState;
  const { isFormValid, isRemainState, isSizeValid, isStyleValid } = judgedState;
  const [_, mainCategoryState] = category;
  const strCategory = arrToString(category);
  const mainCategory = mainCategoryState || 'top';
  const [judgeMeasure, setJudgeMeasure] = useState<MeasureType>(
    getJudgeCategory(strCategory),
  );

  const clearUploads = useCallback(clearUpload, [clearUpload]);
  const clearMeasures = useCallback(clearMeasure, [clearMeasure]);
  const update = useCallback(updateUpload, [updateUpload]);
  const imgsUpload = useCallback(imgUpload, [imgUpload]);
  const removeImgs = useCallback(removeImg, [removeImg]);

  const sizeProps = useMemo(() => sizeData(mainCategory), [mainCategory]);
  const review = useMemo(() => reviewData(mainCategory), [mainCategory]);
  const measureData = useMemo(
    () => getMeasureElement(judgeMeasure),
    [judgeMeasure],
  );

  const height = 170;
  const bodyShape = 'normal'; // TODO: 서버에서 받은 height, bodyShape 상태 저장하기

  const handleSubmit = () => {
    if (isFormValid) {
      mutate(refineUploadData(states), {
        onSuccess: ({ data }) => {
          router.push(`/shop/${data}`);
          clearMeasures();
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
    clearMeasures();
    update(judgeMeasure, 'measureType');
  }, [clearMeasures, judgeMeasure]); // FIX: restrictMode로 인해 실행됨.

  if (!isMounted || !categoryData) return null;
  return (
    // TODO: form 태그로 바꾸기
    <>
      <HeadMeta
        title="re:Fashion | 상품 등록하기"
        url={`${seoData.url}/upload`}
      />

      <ContinueWriteModal {...{ isRemainState, clear: clearUploads }} />

      <PageHeader
        title="상품등록"
        left={<BackBtn color="#000" className={$.back} />}
      />
      <div className={$.upload}>
        <ImgUpload
          {...{ isImgValid, imgUpload: imgsUpload, removeImg: removeImgs }}
          state={states.imgList}
          onChange={update}
        />
        <StyleSelect
          {...{ isStyleValid }}
          data={styleData}
          state={style}
          onChange={update}
        />
        <Contact
          state={contact}
          onChange={update}
          isContactValid={isContactValid}
        />
        <Price
          {...{ isPriceValid }}
          delivery={isIncludeDelivery}
          state={price}
          onChange={update}
        />
        <Basic
          {...{ isBasicValid, categoryData }}
          state={basicInfo}
          onChange={update}
        />
        <SizeInfo
          {...{ isSizeValid }}
          sizeProps={sizeProps}
          state={size}
          onChange={update}
        />
        <SellerReview
          {...{ height, bodyShape, isSellerValid }}
          data={review}
          state={states.sellerNote}
          onChange={update}
        />
        <MeasureInfo
          data={measureData}
          state={states.measure}
          onChange={update}
        />
        <AdditionInfo
          data={additionData}
          additionState={states.additionalInfo}
          opinionState={states.opinion}
          opinionPlaceholder="판매자님의 설명은 구매에 도움이 됩니다.(최대 300자)"
          onChange={update}
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

export default UploadTemplate;
