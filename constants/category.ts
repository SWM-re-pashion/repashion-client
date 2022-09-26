const orderData = [
  { name: '최신순', code: 'latest' },
  { name: '인기순', code: 'like' },
  { name: '조회순', code: 'view' },
  { name: '낮은가격순', code: 'low_price' },
  { name: '높은가격순', code: 'high_price' },
];

const allCategory = {
  id: '0',
  name: '전체',
  code: 'all',
};

const recommendCategory = {
  id: '999',
  name: '추천',
  code: 'recommend',
};

export { orderData, allCategory, recommendCategory };
