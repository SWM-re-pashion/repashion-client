import { ReactElement } from 'react';

import ImgSlide from '@organisms/ImgSlide';
import Layout from '@templates/Layout';

const EXAMPLE_URL =
  'https://images.unsplash.com/photo-1618588507085-c79565432917?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80';

const imgBoxMocks = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  src: EXAMPLE_URL,
  alt: `img-mock-${i}`,
  width: 360,
  height: 360,
}));

function ShopDetail() {
  return (
    <section>
      <ImgSlide imgList={imgBoxMocks} />
    </section>
  );
}

ShopDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout noPadding>{page}</Layout>;
};

export default ShopDetail;
