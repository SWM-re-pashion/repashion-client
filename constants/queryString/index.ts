import { orderData } from '..';

export const queries: readonly (keyof Omit<req.ShopFeed, 'page' | 'size'>)[] = [
  'category',
  'hide_sold',
  'order',
  'style',
  'price_goe',
  'price_loe',
  'color',
  'fit',
  'length',
  'clothes_size',
];

export const queryData: [keyof Omit<req.ShopFeed, 'page' | 'size'>, string?][] =
  ['1', 'true', orderData[0].code, '', '', '', '', '', '', ''].map(
    (prev, i) => [queries[i], prev],
  );
