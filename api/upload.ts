/* eslint-disable @typescript-eslint/no-unused-vars */
import { UploadStoreState } from '#types/storeType/upload';
import { useMutation } from '@tanstack/react-query';
import { AiAxios, Axios } from 'api/core';
import { deepClone, arrToString } from 'utils';

export const postImgs = async (files: FormData) => {
  const { data } = await AiAxios.post('/api/product/uploads', files);
  return data;
};

export const postProduct = async (
  uploadData: UploadStoreState,
): Promise<res.UploadData> => {
  const {
    imgUpload,
    removeImg,
    updateUpload,
    clearMeasure,
    clearUpload,
    ...rest
  }: UploadStoreState = deepClone(uploadData);

  const reqData: req.UploadData = {
    ...rest,
    imgList: rest.imgList.map(({ src }) => src),
    basicInfo: {
      title: rest.basicInfo.title,
      category: arrToString(rest.basicInfo.category),
      brand: rest.basicInfo.brand,
    },
    style: {
      ...rest.style,
      color: arrToString(rest.style.color),
    },
  };

  Object.entries(reqData.measure).forEach(([key, value]) => {
    if (!value) delete reqData.measure[key];
  });

  const { data } = await Axios.post('/api/product', reqData);
  return data;
};

export const useImgUpload = () => {
  return useMutation(postImgs, {
    onError: (err) => {
      console.log(err);
    },
  });
};

export const useProductUpload = () => {
  return useMutation(postProduct, {
    onError: (err) => {
      console.log(err);
    },
  });
};
