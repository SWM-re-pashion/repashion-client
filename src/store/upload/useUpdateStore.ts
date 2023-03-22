import { UploadStoreState } from '#types/storeType/upload';
import create from 'zustand';

import { createUpdateSlice } from './UpdateSlice';
import { createUploadSlice } from './UploadSlice';

export const useUpdateStore = create<UploadStoreState>((...a) => ({
  ...createUploadSlice(...a),
  ...createUpdateSlice(...a),
}));
