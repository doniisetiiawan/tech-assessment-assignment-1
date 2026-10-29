export type PurchaseDecision =
  | { status: 'out_of_stock' }
  | { status: 'insufficient_balance' }
  | { status: 'success'; order_id: string; product_id: string; total: number };

interface PurchaseInput {
  price: number;
  balance: number;
  stock: number;
  productId?: string;
}

export function decidePurchase({ price, balance, stock, productId = '' }: PurchaseInput): PurchaseDecision {
  if (stock < 1) return { status: 'out_of_stock' };
  if (price > balance) return { status: 'insufficient_balance' };
  return {
    status: 'success',
    order_id: 'ORB-' + Date.now().toString().slice(-8),
    product_id: productId,
    total: price,
  };
}
