/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import { ReactElement, useCallback, useState } from 'react';

import ButtonFooter from 'components/shared/atoms/ButtonFooter';
import ImgBox from 'components/shared/atoms/ImgBox';
import InfoHeader from 'components/shared/molecules/InfoHeader';
import InfoPageNum from 'components/shared/molecules/InfoPageNum';
import Layout from 'components/shared/templates/Layout';
import { NextPageWithLayout } from 'pages/_app';
import { updateInfo } from 'utils';

import $ from './style.module.scss';

const EXAMPLE_URL =
  'https://images.unsplash.com/photo-1618588507085-c79565432917?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80';

export const StyleInfo: NextPageWithLayout = () => {
  const [imgList, setImgList] = useState<number[]>([]);
  const imgBoxMocks = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    src: EXAMPLE_URL,
  }));

  const handleClick = useCallback(
    (id: number) => setImgList(updateInfo<number>(imgList, id)),
    [imgList],
  );

  return (
    <>
      <InfoPageNum>1/3</InfoPageNum>

      <InfoHeader title="style" style={{ marginBottom: '17px' }} required>
        선호하는 사진을 선택주세요.
        <br /> 2개 이상 선택 가능해요.
      </InfoHeader>
      <section className={$['style-info']}>
        {imgBoxMocks.map(({ id, src }) => (
          <ImgBox
            id={id}
            key={src + id}
            src={src}
            alt={`${id}번 이미지`}
            isNeedClick
            isSelected={imgList.includes(id)}
            handleClick={handleClick}
          />
        ))}
      </section>
      <ButtonFooter>다음</ButtonFooter>
    </>
  );
};

StyleInfo.getLayout = function getLayout(page: ReactElement) {
  return <Layout decreaseHeight={80}>{page}</Layout>;
};

export default StyleInfo;
