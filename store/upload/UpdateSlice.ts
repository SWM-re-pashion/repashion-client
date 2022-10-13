import { UploadState } from '#types/storeType/upload';
import { uploadInitialState } from 'store/constants';
import { StateCreator } from 'zustand';

export interface UpdateSlice extends UploadState {
  initState: (state: UploadState) => void;
}

export const createUpdateSlice: StateCreator<
  UpdateSlice,
  [],
  [],
  UpdateSlice
> = (set) => ({
  ...uploadInitialState,
  initState: (state: UploadState) => {
    set(state);
  },
});
