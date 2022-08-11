export const categoryData: data.CategoryTree = {
  name: '성별',
  code: 'gender',
  children: [
    {
      name: '남성',
      code: 'men',
      children: [
        {
          name: '바이크',
          code: 'bike',
          children: [
            { name: '오토바이', code: 'bicycle' },
            { name: '오', code: 'bi' },
            { name: '토', code: 'cle' },
            { name: '바이', code: 'bicy' },
          ],
        },
      ],
    },
    {
      name: '여성',
      code: 'women',
      children: [
        {
          name: '상의',
          code: 'top',
          children: [
            { name: '블라우스', code: 'blouse' },
            { name: '브라탑', code: 'bratop' },
            { name: '원피스', code: 'onepiece' },
          ],
        },
        {
          name: '하의',
          code: 'bottom',
          children: [
            { name: '스커트', code: 'skirt' },
            { name: '레깅스', code: 'leggings' },
          ],
        },
      ],
    },
    {
      name: '공용',
      code: 'common',
      children: [
        {
          name: '상의',
          code: 'top',
          children: [
            { name: '탑', code: 'top' },
            { name: '반팔', code: 'short' },
            { name: '긴팔', code: 'long' },
            { name: '니트웨어', code: 'knit' },
            { name: '셔츠', code: 'shirt' },
            { name: '후드티', code: 'hood' },
          ],
        },
        {
          name: '하의',
          code: 'bottom',
          children: [
            { name: '청바지', code: 'jeans' },
            { name: '팬츠', code: 'pants' },
            { name: '조거팬츠', code: 'jogger' },
          ],
        },
        {
          name: '아우터',
          code: 'outer',
          children: [
            { name: '코트', code: 'coat' },
            { name: '재킷', code: 'jacket' },
            { name: '점퍼', code: 'jumper' },
            { name: '패딩', code: 'paddig' },
            { name: '베스트', code: 'vest' },
            { name: '가디건', code: 'cardigan' },
            { name: '집업', code: 'zipup' },
          ],
        },
      ],
    },
  ],
};
