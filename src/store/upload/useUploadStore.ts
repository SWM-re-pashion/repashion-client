import create from 'zustand';
import { persist } from 'zustand/middleware';

import { createUploadSlice } from './UploadSlice';

import { UploadStoreState } from '#types/storeType/upload';

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
