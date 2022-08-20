import { DefaultData } from '#types/index';

export const getLabelName = (
  options: (string | DefaultData)[],
  selected: string | number,
) => {
  let labelName = '선택';
  options.forEach((option) => {
    if (typeof option !== 'string') {
      if (option.code === selected) labelName = option.name;
    }
    if (option === selected) labelName = option;
  });
  return labelName;
};
