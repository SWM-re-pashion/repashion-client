const genders = [
  { name: '남성', code: 'men' },
  { name: '여성', code: 'women' },
];
const bodyShapes = [
  { name: '마름', code: 'thin' },
  { name: '보통', code: 'normal' },
  { name: '통통', code: 'chubby' },
  { name: '뚱뚱', code: 'fat' },
];
const topSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
const bottomSizes = [...Array.from({ length: 16 }, (_, i) => `${22 + i}`)];

export { genders, bodyShapes, topSizes, bottomSizes };
