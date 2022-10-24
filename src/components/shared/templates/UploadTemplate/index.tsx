import { useCallback, useMemo } from 'react';

import { UploadStoreState } from '#types/storeType/upload';
import BackBtn from '@atoms/BackBtn';
import ButtonFooter from '@atoms/ButtonFooter';
import HeadMeta from '@atoms/HeadMeta';
import { seoData } from '@constants/seo';
import { additionData, styleData } from '@constants/upload/constants';
import { reviewData, sizeData } from '@constants/upload/utils';
import PageHeader from '@molecules/PageHeader';
import { getBreadcrumb } from 'src/api/category';
import AdditionInfo from 'src/components/Upload/organisms/AdditionInfo';
import Basic from 'src/components/Upload/organisms/Basic';
import Contact from 'src/components/Upload/organisms/Contact';
import ContinueWriteModal from 'src/components/Upload/organisms/ContinueWriteModal';
import ImgUpload from 'src/components/Upload/organisms/ImgUpload';
import MeasureInfo from 'src/components/Upload/organisms/MeasureInfo';
import Price from 'src/components/Upload/organisms/Price';
import SellerReview from 'src/components/Upload/organisms/SellerReview';
import SizeInfo from 'src/components/Upload/organisms/SizeInfo';
import StyleSelect from 'src/components/Upload/organisms/StyleSelect';
import { useMounted, useDidMountEffect } from 'src/hooks';
import { useProductUpload, useUpdateProduct } from 'src/hooks/api/upload';
import { getJudgeCategory, getMeasureElement } from 'src/utils';
import { toastError } from 'src/utils/toaster';
import { judgeValid, refineUploadData } from 'src/utils/upload.utils';

import $ from './style.module.scss';

type Props = {
  id: string;
  isUpdate: boolean;
  states: UploadStoreState;
  categoryData: res.CategoryTree['data'] | undefined;
};

function UploadTemplate({ id, isUpdate, states, categoryData }: Props) {
  const isMounted = useMounted();
  const { mutate } = useProductUpload();
  const { mutate: updateMutate } = useUpdateProduct(id);
  const { price, isIncludeDelivery, style, basicInfo, size, contact } = states;
  const { updateArr, updateUpload, removeImg } = states;
  const { imgUpload, clearUpload, initMeasure } = states;
  const { category } = basicInfo;
  const [gender, main, sub] = category;
  const breadCrumb = getBreadcrumb(categoryData, sub || main || gender) || '';

  const judgedState = judgeValid(states);
  const { isImgValid, isBasicValid, isPriceValid } = judgedState;
  const { isSellerValid, isContactValid } = judgedState;
  const { isFormValid, isRemainState, isSizeValid, isStyleValid } = judgedState;

  const clearUploads = useCallback(clearUpload, [clearUpload]);
  const initMeasures = useCallback(initMeasure, [initMeasure]);
  const update = useCallback(updateUpload, [updateUpload]);
  const updateArray = useCallback(updateArr, [updateArr]);
  const imgsUpload = useCallback(imgUpload, [imgUpload]);
  const removeImgs = useCallback(removeImg, [removeImg]);

  const mainCategory = useMemo(
    () => getJudgeCategory(breadCrumb),
    [breadCrumb],
  );
  const { measureData, measureState } = useMemo(
    () => getMeasureElement(mainCategory),
    [mainCategory],
  );
  const sizeProps = useMemo(() => sizeData(mainCategory), [mainCategory]);
  const review = useMemo(() => reviewData(mainCategory), [mainCategory]);
  // TODO: 사이즈, 리뷰 데이터 state 초기화
  // TODO: 서버에서 받은 height, bodyShape 상태 저장하기

  const handleSubmit = () => {
    if (isFormValid) {
      const body = refineUploadData(states);
      if (isUpdate) updateMutate({ id, body });
      else mutate(body);
    } else {
      toastError({ message: '필수 정보를 알려주세요.' });
    }
  };

  useDidMountEffect(() => {
    // TODO: 상품 수정 시 measure 값이 바뀌는 이슈
    initMeasures(measureState);
    update(mainCategory, 'measureType');
  }, [mainCategory]); // FIX: restrictMode로 인해 실행됨.

  if (!isMounted || !categoryData) return null;
  return (
    // TODO: form 태그로 바꾸기
    <>
      <HeadMeta
        title={`re:Fashion | 상품 ${isUpdate ? '수정' : '등록'}하기`}
        url={`${seoData.url}/upload`}
      />

      {!isUpdate && (
        <ContinueWriteModal {...{ isRemainState, clear: clearUploads }} />
      )}

      <PageHeader
        title={`상품${isUpdate ? '수정' : '등록'}`}
        left={<BackBtn color="#000" className={$.back} />}
      />
      <div className={$.upload}>
        <ImgUpload
          {...{ isImgValid, imgUpload: imgsUpload, removeImg: removeImgs }}
          {...{ updateArr: updateArray, categoryData }}
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
          {...{ isSellerValid }}
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
