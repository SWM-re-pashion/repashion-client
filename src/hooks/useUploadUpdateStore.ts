import { useUpdateStore } from 'src/store/upload/useUpdateStore';
import { useUploadStore } from 'src/store/upload/useUploadStore';

export function useUploadUpdateStore(isUpdate: boolean) {
  return isUpdate ? useUpdateStore : useUploadStore;
}
