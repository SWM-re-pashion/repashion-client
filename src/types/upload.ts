export type recognitionResult = {
  state?: 'success' | 'failed' | 'error';
  category?: string;
  tag?: string;
  color?: string;
  material?: string;
};

export type UploadUpdateProps = {
  isUpdate: boolean;
};

export type UploadTemplateProps = {
  id: string;
} & UploadUpdateProps;

export type UploadTemplateWithCategory = {
  categoryData: res.CategoryTree['data'];
} & UploadUpdateProps;
