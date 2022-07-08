const genders = ['여성', '남성'];
const bodyForms = ['체형', '마름', '날씬', '보통', '통통'];
const topSizes = ['상의 사이즈', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
const bottomSizes = [
  '하의 사이즈(인치)',
  ...Array.from({ length: 16 }, (_, i) => 22 + i),
];

export { genders, bodyForms, topSizes, bottomSizes };
