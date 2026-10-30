import { describe, expect, it } from 'vitest';
import { filterProducts, sortProducts, type ProductCore } from './filters';

const products: ProductCore[] = [
  { id: '1', name: 'iPhone 16 Pro', brand: 'Apple', type: 'Smartphones', price: 999 },
  { id: '2', name: 'Galaxy S25 Ultra', brand: 'Samsung', type: 'Smartphones', price: 1299 },
  { id: '3', name: 'iPad Air', brand: 'Apple', type: 'Tablets', price: 599 },
  { id: '4', name: 'Pixel 9 Pro', brand: 'Google', type: 'Smartphones', price: 999 },
  { id: '5', name: 'Galaxy Tab S10+', brand: 'Samsung', type: 'Tablets', price: 999 },
  { id: '6', name: 'iPhone 16', brand: 'Apple', type: 'Smartphones', price: 799 },
];

describe('filterProducts', () => {
  it('returns all products for "All devices" with empty search', () => {
    expect(filterProducts(products, 'All devices', '')).toHaveLength(6);
  });

  it('filters by category', () => {
    const result = filterProducts(products, 'Tablets', '');
    expect(result.map(p => p.id)).toEqual(['3', '5']);
  });

  it('filters by search across name and brand (case-insensitive)', () => {
    expect(filterProducts(products, 'All devices', 'iphone').map(p => p.id)).toEqual(['1', '6']);
    expect(filterProducts(products, 'All devices', 'APPLE').map(p => p.id)).toEqual(['1', '3', '6']);
    expect(filterProducts(products, 'All devices', 'galaxy').map(p => p.id)).toEqual(['2', '5']);
  });

  it('combines category and search', () => {
    const result = filterProducts(products, 'Smartphones', 'apple');
    expect(result.map(p => p.id)).toEqual(['1', '6']);
  });

  it('returns empty array when nothing matches', () => {
    expect(filterProducts(products, 'Tablets', 'iphone')).toEqual([]);
  });

  it('does not mutate the input array', () => {
    const copy = [...products];
    filterProducts(products, 'Tablets', 'x');
    expect(products).toEqual(copy);
  });
});

describe('sortProducts', () => {
  it('keeps original order for "featured"', () => {
    expect(sortProducts(products, 'featured').map(p => p.id)).toEqual(['1', '2', '3', '4', '5', '6']);
  });

  it('sorts by price low to high (stable for ties)', () => {
    expect(sortProducts(products, 'low').map(p => p.id)).toEqual(['3', '6', '1', '4', '5', '2']);
  });

  it('sorts by price high to low (stable for ties)', () => {
    expect(sortProducts(products, 'high').map(p => p.id)).toEqual(['2', '1', '4', '5', '6', '3']);
  });

  it('does not mutate the input array', () => {
    const copy = [...products];
    sortProducts(products, 'low');
    expect(products).toEqual(copy);
  });
});
