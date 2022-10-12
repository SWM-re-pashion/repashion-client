import { UploadStoreState } from '#types/storeType/upload';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { createUploadSlice } from './UploadSlice';

export const useUploadStore = create(
  persist<UploadStoreState>(
    (...a) => ({
      ...createUploadSlice(...a),
    }),
    {
      name: 'upload-storage',
    },
  ),
);
