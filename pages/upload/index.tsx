import { ReactElement, useCallback } from 'react';

import BackBtn from '@atoms/BackBtn';
import PageHeader from '@molecules/PageHeader';
import Layout from '@templates/Layout';
import ImgUpload from 'components/Upload/organisms/ImgUpload';
import StyleSelect from 'components/Upload/organisms/StyleSelect';
import { useUploadStore } from 'store/useUploadStore';

import { styleData } from './constants';
import $ from './style.module.scss';

function Uplaod() {
  const imgUpload = useUploadStore(useCallback((state) => state.imgUpload, []));
  const removeImg = useUploadStore(useCallback((state) => state.removeImg, []));
  const states = useUploadStore((state) => state.imgList);

  return (
    <>
      <PageHeader
        title="상품등록"
        left={<BackBtn color="#000" className={$.back} />}
      />
      <div className={$.upload}>
        <ImgUpload dispatch={imgUpload} data={states} remove={removeImg} />
        <StyleSelect data={styleData} />
      </div>
    </>
  );
}

Uplaod.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default Uplaod;
