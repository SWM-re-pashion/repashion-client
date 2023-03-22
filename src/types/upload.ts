export type recognitionResult = {
  state?: 'success' | 'failed' | 'error';
  category?: string;
  tag?: string;
  color?: string;
  material?: string;
};

export type UploadTemplateProps = {
  isUpdate: boolean;
};
