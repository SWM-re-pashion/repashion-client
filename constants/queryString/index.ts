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
