import { UploadTemplateProps } from '#types/upload';
import ButtonFooter from '@molecules/ButtonFooter';
import { uploadStateToData } from 'src/helpers/upload';
import { useProductUpload, useUpdateProduct } from 'src/hooks/api/upload';
import { useUploadUpdateStore } from 'src/hooks/useUploadUpdateStore';
import { toastError } from 'src/utils/toaster';

export default function SubmitBtn({ id, isUpdate }: UploadTemplateProps) {
  const { mutate } = useProductUpload();
  const { mutate: updateMutate } = useUpdateProduct(id);
  const useStore = useUploadUpdateStore(isUpdate);
  const states = useStore((state) => state);
  const isFormValid = Object.values(states.validation).every((x) => x);

  const handleSubmit = () => {
    if (isFormValid) {
      const body = uploadStateToData(states);
      if (isUpdate) updateMutate({ id, body });
      else mutate(body);
    } else {
      toastError({ message: '필수 정보를 알려주세요.' });
    }
  };

  return (
    <ButtonFooter
      background="white"
      type="submit"
      style={{ padding: '0 21px 30px' }}
      disabled={!isFormValid}
      onClick={handleSubmit}
    >
      올리기
    </ButtonFooter>
  );
}
