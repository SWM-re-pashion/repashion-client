import { useEffect } from 'react';

import { ValidationKey } from '#types/storeType/upload';

import { useUploadUpdateStore } from './useUploadUpdateStore';

type Props = {
  isUpdate: boolean;
  type: ValidationKey;
  isValid: boolean;
};

export default function useUploadFormValidate(props: Props) {
  const { isUpdate, type, isValid } = props;
  const useStore = useUploadUpdateStore(isUpdate);
  const updateValidate = useStore((states) => states.updateValidate);

  useEffect(() => {
    updateValidate(type, isValid);
  }, [isValid, type, updateValidate]);
}
