// Public API of the purchase feature. Presentation + application only.
export { default as DetailPage } from './presentation/DetailPage';
export { default as BuyButton } from './presentation/BuyButton';
export { default as SpecList } from './presentation/SpecList';
export { default as ResultDialog } from './presentation/ResultDialog';
export { fetchProduct, buyProduct, selectPurchase } from './application/purchase-slice';
export type { PurchaseState } from './application/purchase-slice';
export { decidePurchase } from './domain/purchase';
export type { PurchaseDecision } from './domain/purchase';
export type { ProductDetail } from './domain/product';
export { LocalProductRepository } from './infrastructure/product-repository';
