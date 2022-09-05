export const categoryData: res.CategoryTree['data'] = {
  name: '성별',
  code: 'gender',
  children: [
    {
      id: '1',
      name: '남성',
      code: 'men',
      children: [
        {
          id: '2',
          name: '상의',
          code: 'top',
          children: [{ id: '8', name: '민소매', code: 'sleeveless' }],
        },
      ],
    },
    {
      id: '2',
      name: '여성',
      code: 'women',
      children: [
        {
          id: '2',
          name: '상의',
          code: 'top',
          children: [
            { id: '8', name: '블라우스', code: 'blouse' },
            { id: '9', name: '브라탑', code: 'bratop' },
            { id: '10', name: '원피스', code: 'onepiece' },
          ],
        },
        {
          id: '3',
          name: '하의',
          code: 'bottom',
          children: [
            { id: '5', name: '스커트', code: 'skirt' },
            { id: '6', name: '레깅스', code: 'leggings' },
          ],
        },
      ],
    },
    {
      id: '3',
      name: '공용',
      code: 'common',
      children: [
        {
          id: '1',
          name: '추천',
          code: 'recommend',
        },
        {
          id: '2',
          name: '상의',
          code: 'top',
          children: [
            { id: '1', name: '전체', code: 'all' },
            { id: '2', name: '탑', code: 'top' },
            { id: '3', name: '반팔', code: 'short' },
            { id: '4', name: '긴팔', code: 'long' },
            { id: '5', name: '니트웨어', code: 'knit' },
            { id: '6', name: '셔츠', code: 'shirt' },
            { id: '7', name: '후드티', code: 'hood' },
          ],
        },
        {
          id: '3',
          name: '하의',
          code: 'bottom',
          children: [
            { id: '1', name: '전체', code: 'all' },
            { id: '2', name: '청바지', code: 'jeans' },
            { id: '3', name: '팬츠', code: 'pants' },
            { id: '4', name: '조거팬츠', code: 'jogger' },
          ],
        },
        {
          id: '4',
          name: '아우터',
          code: 'outer',
          children: [
            { id: '1', name: '전체', code: 'all' },
            { id: '2', name: '코트', code: 'coat' },
            { id: '3', name: '재킷', code: 'jacket' },
            { id: '4', name: '점퍼', code: 'jumper' },
            { id: '5', name: '패딩', code: 'padding' },
            { id: '6', name: '베스트', code: 'vest' },
            { id: '7', name: '가디건', code: 'cardigan' },
            { id: '8', name: '집업', code: 'zipup' },
          ],
        },
      ],
    },
  ],
};
