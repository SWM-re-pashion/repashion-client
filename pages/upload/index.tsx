import { ReactElement, useCallback } from 'react';

import BackBtn from '@atoms/BackBtn';
import PageHeader from '@molecules/PageHeader';
import InfoBtnBox from '@organisms/InfoBtnBox';
import Layout from '@templates/Layout';
import Price from 'components/Upload/molecules/Price';
import ImgUpload from 'components/Upload/organisms/ImgUpload';
import StyleSelect from 'components/Upload/organisms/StyleSelect';
import { useUploadStore } from 'store/useUploadStore';

import { styleData } from './constants';
import $ from './style.module.scss';
import { sizeData } from './utils';

function Uplaod() {
  const imgUpload = useUploadStore(useCallback((state) => state.imgUpload, []));
  const removeImg = useUploadStore(useCallback((state) => state.removeImg, []));
  const updateUpload = useUploadStore(
    useCallback((state) => state.updateUpload, []),
  );
  const states = useUploadStore((state) => state);
  const mainCategory = states.basicInfo.category.split('/')[1];
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
          data={states.imgList}
          remove={removeImg}
        />
        <StyleSelect data={styleData} />
        <Price delivery={states.isIncludeDelivery} onChange={updateUpload} />
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
