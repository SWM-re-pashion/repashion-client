import { orderData } from '..';

export const shopQueries: readonly (keyof Omit<
  req.ShopFeed,
  'page' | 'size'
>)[] = [
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

export const shopQueryData: [
  keyof Omit<req.ShopFeed, 'page' | 'size'>,
  string?,
][] = ['1', 'false', orderData[0].code, '', '', '', '', '', '', ''].map(
  (prev, i) => [shopQueries[i], prev],
);

export const searchQueries: readonly (keyof Omit<
  req.ShopFeed,
  'page' | 'size'
>)[] = ['value', 'hideSold', 'order'];

export const searchQueryData: [
  keyof Omit<req.ShopFeed, 'page' | 'size'>,
  string?,
][] = ['', 'false', orderData[0].code].map((prev, i) => [
  searchQueries[i],
  prev,
]);
