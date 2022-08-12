import { ReactElement, useCallback, useState } from 'react';

import BackBtn from '@atoms/BackBtn';
import PageHeader from '@molecules/PageHeader';
import InfoBtnBox from '@organisms/InfoBtnBox';
import Layout from '@templates/Layout';
import Basic from 'components/Upload/organisms/ Basic';
import ImgUpload from 'components/Upload/organisms/ImgUpload';
import Price from 'components/Upload/organisms/Price';
import StyleSelect from 'components/Upload/organisms/StyleSelect';
import { useUploadStore } from 'store/useUploadStore';

import { styleData } from './constants';
import $ from './style.module.scss';
import { sizeData } from './utils';

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
  const size = sizeData(mainCategory || 'top');

  return (
    <>
      <PageHeader
        title="상품등록"
        left={<BackBtn color="#000" className={$.back} />}
      />
      <div className={$.upload}>
        <ImgUpload
          dispatch={imgUpload}
          state={states.imgList}
          remove={removeImg}
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
      </div>
    </>
  );
}

Uplaod.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Uplaod;
