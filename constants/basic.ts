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

const condition = [
  { name: '새 상품', code: 'new' },
  { name: '거의 없음', code: 'none' },
  { name: '보통', code: 'normal' },
  { name: '조금 있음', code: 'little' },
  { name: '많이 있음', code: 'many' },
];

export { genders, bodyShapes, topSizes, bottomSizes, condition };
