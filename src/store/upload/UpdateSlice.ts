import { UploadState, UploadStoreState } from '#types/storeType/upload';
import { uploadInitialState } from 'src/store/constants';
import { StateCreator } from 'zustand';

export const createUpdateSlice: StateCreator<
  UploadState,
  [],
  [],
  UploadState
> = () => ({
  ...uploadInitialState,
});
