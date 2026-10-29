import { describe, it, expect } from "vitest";
import { filterProducts, sortProducts } from "./filters";
import { mockProducts } from "../../../shared/data/mock-products";

const sampleProducts = mockProducts;

describe('filters', () => {
  it('can filter products by type ', () => {
    const result = filterProducts(sampleProducts, 'Tablets', '');
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('iPad Air');
    expect(result[1].name).toBe('Galaxy Tab S10+');
  });

  it('can filter products by name and (case-insensitive)', () => {
    const result = filterProducts(sampleProducts, 'All devices', 'iphone');
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('iPhone 16 Pro');
    expect(result[1].name).toBe('iPhone 16');
  });

  it('can sort by price from lowest to highest (low)', () => {
    const result = sortProducts(sampleProducts, 'low');
    expect(result[0].price).toBe(599);
    expect(result[5].price).toBe(1299);
  });

  it('can sort by price from highest to lowest (high)', () => {
    const result = sortProducts(sampleProducts, 'high');
    expect(result[0].price).toBe(1299);
    expect(result[5].price).toBe(599);
  });
});