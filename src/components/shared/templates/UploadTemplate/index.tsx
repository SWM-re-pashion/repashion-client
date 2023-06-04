import { UploadTemplateProps } from '#types/upload';
import BackBtn from '@atoms/BackBtn';
import HeadMeta from '@atoms/HeadMeta';
import { seoData } from '@constants/seo';
import { additionData } from '@constants/upload/constants';
import { styleData } from '@constants/upload/utils';
import PageHeader from '@molecules/PageHeader';
import AdditionInfo from 'src/components/Upload/organisms/AdditionInfo';
import Basic from 'src/components/Upload/organisms/Basic';
import Contact from 'src/components/Upload/organisms/Contact';
import ImgUpload from 'src/components/Upload/organisms/ImgUpload';
import MeasureInfo from 'src/components/Upload/organisms/MeasureInfo';
import Price from 'src/components/Upload/organisms/Price';
import SellerReview from 'src/components/Upload/organisms/SellerReview';
import SizeInfo from 'src/components/Upload/organisms/SizeInfo';
import StyleSelect from 'src/components/Upload/organisms/StyleSelect';
import SubmitBtn from 'src/components/Upload/organisms/SubmitBtn';
import { useMounted } from 'src/hooks';
import { useCategoryTree } from 'src/hooks/api/category';
import { useStaticData } from 'src/hooks/api/staticData';

import $ from './style.module.scss';

function UploadTemplate({ id, isUpdate }: UploadTemplateProps) {
  const isMounted = useMounted();
  const categoryData = useCategoryTree(true)?.data;
  const { data: styles } = useStaticData<res.StaticData>('Style');
  const { data: bodyShapes } = useStaticData<res.StaticData>('BodyShape');
  const { data: pollution } =
    useStaticData<res.StaticData>('PollutionCondition');
  const { data: colors } = useStaticData<res.KindStaticData>('Color');
  const { data: sizes } = useStaticData<res.KindStaticData>('Size');
  const { data: lengths } = useStaticData<res.KindStaticData>('Length');
  const { data: fits } = useStaticData<res.KindStaticData>('Fit');
  const condition1 = !categoryData || !colors || !styles || !sizes;
  const condition2 = !pollution || !lengths || !bodyShapes || !fits;
  const noRenderCondition = condition1 || condition2;

  const styleProps = styleData(styles, colors);
  const reviewDatas = { pollution, lengths, bodyShapes, fits };
  // TODO: 사이즈, 리뷰 데이터 state 초기화
  // TODO: 서버에서 받은 height, bodyShape 상태 저장하기

  if (!isMounted || noRenderCondition) return null;
  return (
    <>
      <HeadMeta
        title={`re:Fashion | 상품 ${isUpdate ? '수정' : '등록'}하기`}
        url={`${seoData.url}/upload`}
      />

      <PageHeader
        title={`상품${isUpdate ? '수정' : '등록'}`}
        left={<BackBtn color="#000" className={$.back} />}
      />
      <form className={$.upload}>
        <ImgUpload {...{ categoryData, isUpdate }} />
        <StyleSelect {...{ isUpdate }} data={styleProps} />
        <Contact {...{ isUpdate }} />
        <Price {...{ isUpdate }} />
        <Basic {...{ isUpdate, categoryData }} />
        <SizeInfo {...{ isUpdate, sizes, categoryData }} />
        <SellerReview {...{ isUpdate, reviewDatas, categoryData }} />
        <MeasureInfo {...{ isUpdate, categoryData }} />
        <AdditionInfo {...{ isUpdate }} data={additionData} />
        <SubmitBtn {...{ isUpdate, id }} />
      </form>
    </>
  );
}

export default UploadTemplate;
