// Ports owned by the application layer (DIP) — implemented by infrastructure.
import type { ProductDetail } from '../../domain/product';
import type { PurchaseDecision } from '../../domain/purchase';

export interface ProductRepository {
  findById(id: string): Promise<ProductDetail>;
  buy(product: ProductDetail, balance: number): Promise<PurchaseDecision>;
}
