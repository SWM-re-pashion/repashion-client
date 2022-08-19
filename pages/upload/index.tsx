import { ReactElement, useCallback, useState } from 'react';

import BackBtn from '@atoms/BackBtn';
import PageHeader from '@molecules/PageHeader';
import InfoBtnBox from '@organisms/InfoBtnBox';
import Layout from '@templates/Layout';
import Basic from 'components/Upload/organisms/Basic';
import ImgUpload from 'components/Upload/organisms/ImgUpload';
import Measure from 'components/Upload/organisms/Measure';
import Price from 'components/Upload/organisms/Price';
import SellerReview from 'components/Upload/organisms/SellerReview';
import StyleSelect from 'components/Upload/organisms/StyleSelect';
import { useUploadStore } from 'store/useUploadStore';
import { getMeasureElement } from 'utils/measure';

import { styleData } from './constants';
import $ from './style.module.scss';
import { reviewData, sizeData } from './utils';

function Uplaod() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const imgUpload = useUploadStore(useCallback((state) => state.imgUpload, []));
  const removeImg = useUploadStore(useCallback((state) => state.removeImg, []));
  const updateUpload = useUploadStore(
    useCallback((state) => state.updateUpload, []),
  );
  const states = useUploadStore((state) => state);
  const mainCategory = states.basicInfo.category[1];
  const category = mainCategory || 'top';
  const size = sizeData(category);
  const review = reviewData(category);
  const measureData = getMeasureElement(states.basicInfo.category);

  const height = 170;
  const bodyShape = 'normal'; // Todo: 서버에서 받은 height, bodyShape 상태 저장하기

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
        <Price delivery={states.isIncludeDelivery} onChange={updateUpload} />
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
        <Measure
          data={measureData}
          state={states.measure}
          onChange={updateUpload}
        />
      </div>
    </>
  );
}

Uplaod.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Uplaod;
