import { FormEvent, useMemo } from 'react';

import { UploadTemplateProps } from '#types/upload';
import BackBtn from '@atoms/BackBtn';
import HeadMeta from '@atoms/HeadMeta';
import { seoData } from '@constants/seo';
import { additionData } from '@constants/upload/constants';
import { reviewData, sizeData, styleData } from '@constants/upload/utils';
import ButtonFooter from '@molecules/ButtonFooter';
import PageHeader from '@molecules/PageHeader';
import { getBreadcrumb } from 'src/api/category';
import AdditionInfo from 'src/components/Upload/organisms/AdditionInfo';
import Basic from 'src/components/Upload/organisms/Basic';
import Contact from 'src/components/Upload/organisms/Contact';
import ImgUpload from 'src/components/Upload/organisms/ImgUpload';
import MeasureInfo from 'src/components/Upload/organisms/MeasureInfo';
import Price from 'src/components/Upload/organisms/Price';
import SellerReview from 'src/components/Upload/organisms/SellerReview';
import SizeInfo from 'src/components/Upload/organisms/SizeInfo';
import StyleSelect from 'src/components/Upload/organisms/StyleSelect';
import { uploadStateToData } from 'src/helpers/upload';
import { useMounted } from 'src/hooks';
import { useCategoryTree } from 'src/hooks/api/category';
import { useStaticData } from 'src/hooks/api/staticData';
import { useProductUpload, useUpdateProduct } from 'src/hooks/api/upload';
import { useUploadUpdateStore } from 'src/hooks/useUploadUpdateStore';
import { getJudgeCategory } from 'src/utils';
import { toastError } from 'src/utils/toaster';

import $ from './style.module.scss';

type Props = {
  id: string;
} & UploadTemplateProps;

function UploadTemplate({ id, isUpdate }: Props) {
  const isMounted = useMounted();
  const { mutate } = useProductUpload();
  const { mutate: updateMutate } = useUpdateProduct(id);
  const categoryData = useCategoryTree(true)?.data;
  const { data: styles } = useStaticData<res.StaticData>('Style');
  const { data: bodyShapes } = useStaticData<res.StaticData>('BodyShape');
  const { data: pol } = useStaticData<res.StaticData>('PollutionCondition');
  const { data: colors } = useStaticData<res.KindStaticData>('Color');
  const { data: sizes } = useStaticData<res.KindStaticData>('Size');
  const { data: lengths } = useStaticData<res.KindStaticData>('Length');
  const { data: fits } = useStaticData<res.KindStaticData>('Fit');
  const condition1 = !categoryData || !colors || !styles || !sizes;
  const condition2 = !pol || !lengths || !bodyShapes || !fits;
  const noRenderCondition = condition1 || condition2;

  const useStore = useUploadUpdateStore(isUpdate);
  const states = useStore((state) => state);
  const { basicInfo, validation } = states;
  const [gender, main, sub] = basicInfo.category;
  const breadCrumb = getBreadcrumb(categoryData, sub || main || gender) || '';

  const mainCategory = useMemo(
    () => getJudgeCategory(breadCrumb),
    [breadCrumb],
  );
  const styleProps = useMemo(() => styleData(styles, colors), [styles, colors]);
  const sizeProps = useMemo(
    () => sizeData(mainCategory, sizes as unknown as res.KindStaticData),
    [sizes, mainCategory],
  );
  const reviewDatas = useMemo(
    () => ({ pollution: pol, lengths, bodyShapes, fits }),
    [bodyShapes, fits, lengths, pol],
  );
  const review = useMemo(
    () => reviewData(mainCategory, reviewDatas),
    [mainCategory, reviewDatas],
  );
  // TODO: 사이즈, 리뷰 데이터 state 초기화
  // TODO: 서버에서 받은 height, bodyShape 상태 저장하기

  const isFormValid = Object.values(validation).every((x) => x);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      const body = uploadStateToData(states);
      if (isUpdate) updateMutate({ id, body });
      else mutate(body);
    } else {
      toastError({ message: '필수 정보를 알려주세요.' });
    }
  };

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
      <form className={$.upload} onSubmit={handleSubmit}>
        <ImgUpload {...{ categoryData, isUpdate }} />
        <StyleSelect {...{ isUpdate }} data={styleProps} />
        <Contact {...{ isUpdate }} />
        <Price {...{ isUpdate }} />
        <Basic {...{ isUpdate, categoryData }} />
        <SizeInfo {...{ isUpdate }} sizeProps={sizeProps} />
        <SellerReview {...{ isUpdate }} data={review} />
        <MeasureInfo {...{ isUpdate }} mainCategory={mainCategory} />
        <AdditionInfo {...{ isUpdate }} data={additionData} />
        <ButtonFooter
          background="white"
          type="submit"
          style={{ padding: '0 21px 30px' }}
          disabled={!isFormValid}
        >
          올리기
        </ButtonFooter>
      </form>
    </>
  );
}

export default UploadTemplate;
