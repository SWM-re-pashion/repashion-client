import create from 'zustand';

import { createUpdateSlice, UpdateSlice } from './UpdateSlice';
import { createUploadSlice, UploadSlice } from './UploadSlice';

export const useUploadUpdateStore = create<UpdateSlice & UploadSlice>(
  (...a) => ({
    ...createUploadSlice(...a),
    ...createUpdateSlice(...a),
  }),
);
