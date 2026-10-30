import { describe, expect, it } from 'vitest';
import { decidePurchase } from './purchase';

describe('decidePurchase', () => {
  it('rejects out-of-stock first, before any other rule', () => {
    const result = decidePurchase({ price: 100, balance: 500, stock: 0 });
    expect(result).toEqual({ status: 'out_of_stock' });
  });

  it('rejects out-of-stock even when balance is also insufficient', () => {
    expect(decidePurchase({ price: 100, balance: 50, stock: 0 })).toEqual({ status: 'out_of_stock' });
  });

  it('returns insufficient_balance when price exceeds balance', () => {
    expect(decidePurchase({ price: 1299, balance: 1050, stock: 12 })).toEqual({ status: 'insufficient_balance' });
  });

  it('returns insufficient_balance at exactly zero balance', () => {
    expect(decidePurchase({ price: 1, balance: 0, stock: 1 })).toEqual({ status: 'insufficient_balance' });
  });

  it('succeeds when balance exactly covers price', () => {
    const result = decidePurchase({ price: 1050, balance: 1050, stock: 12 });
    expect(result.status).toBe('success');
  });

  it('succeeds with a generated order id and snapshot of total/product', () => {
    const result = decidePurchase({ price: 999, balance: 1050, stock: 12, productId: '1' });
    expect(result.status).toBe('success');
    if (result.status === 'success') {
      expect(result.order_id).toMatch(/^ORB-\d{8}$/);
      expect(result.product_id).toBe('1');
      expect(result.total).toBe(999);
    }
  });
});
