import { orderData } from '..';

export const queries: readonly (keyof Omit<req.ShopFeed, 'page' | 'size'>)[] = [
  'category',
  'hideSold',
  'order',
  'style',
  'priceGoe',
  'priceLoe',
  'color',
  'fit',
  'length',
  'clothesSize',
];

export const queryData: [keyof Omit<req.ShopFeed, 'page' | 'size'>, string?][] =
  ['1', 'true', orderData[0].code, '', '', '', '', '', '', ''].map(
    (prev, i) => [queries[i], prev],
  );

export const searchQueries: readonly (keyof Omit<
  req.ShopFeed,
  'page' | 'size'
>)[] = ['value', 'hideSold', 'order'];

export const searchQueryData: [
  keyof Omit<req.ShopFeed, 'page' | 'size'>,
  string?,
][] = ['', 'true', orderData[0].code].map((prev, i) => [
  searchQueries[i],
  prev,
]);
