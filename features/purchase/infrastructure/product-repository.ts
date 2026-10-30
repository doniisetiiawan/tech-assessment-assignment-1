// Infrastructure adapter — all "network" details live here, behind the port.
import type { ProductRepository } from '../application/ports/product-repository';
import type { ProductDetail } from '../domain/product';
import { decidePurchase } from '../domain/purchase';
import type { PurchaseDecision } from '../domain/purchase';

// Intentionally duplicated catalogue per Resolved Decision 1. Detail is fetched independently.
const DB: [string, string, string, string, number, string, string, string, string, string, string, string, string][] = [
  ['1', 'iPhone 16 Pro', 'Apple', 'Smartphones', 999, 'Desert Titanium', 'sand', '128 GB', '6.3-inch', 'A18 Pro', '48 MP', 'Up to 27 hours', 'iOS 18'],
  ['2', 'Galaxy S25 Ultra', 'Samsung', 'Smartphones', 1299, 'Titanium Gray', 'gray', '256 GB', '6.9-inch', 'Snapdragon 8 Elite', '200 MP', '5,000 mAh', 'Android 15'],
  ['3', 'iPad Air', 'Apple', 'Tablets', 599, 'Sky Blue', 'blue', '128 GB', '11-inch', 'Apple M3', '12 MP', 'Up to 10 hours', 'iPadOS 18'],
  ['4', 'Pixel 9 Pro', 'Google', 'Smartphones', 999, 'Sage', 'sage', '128 GB', '6.3-inch', 'Google Tensor G4', '50 MP', '4,700 mAh', 'Android 14'],
  ['5', 'Galaxy Tab S10+', 'Samsung', 'Tablets', 999, 'Moonstone Gray', 'purple', '256 GB', '12.4-inch', 'Dimensity 9300+', '13 MP', '10,090 mAh', 'Android 14'],
  ['6', 'iPhone 16', 'Apple', 'Smartphones', 799, 'Ultramarine', 'indigo', '128 GB', '6.1-inch', 'A18', '48 MP', 'Up to 22 hours', 'iOS 18'],
];

export class LocalProductRepository implements ProductRepository {
  findById(id: string): Promise<ProductDetail> {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        const row = DB.find(x => x[0] === id);
        if (!row) {
          reject(new Error('We couldn’t find that device.'));
          return;
        }
        resolve({
          id: row[0], name: row[1], brand: row[2], type: row[3], price: row[4], color: row[5], tone: row[6],
          storage: row[7], screen: row[8], chip: row[9], camera: row[10], battery: row[11], os: row[12], stock: 12,
        });
      }, 600)
    );
  }

  // Fake POST /buy: validation lives in the domain, this simulates the network round-trip.
  buy(product: ProductDetail, balance: number): Promise<PurchaseDecision> {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (product.stock < 1) {
          reject(new Error('This device is out of stock.'));
          return;
        }
        const result = decidePurchase({ price: product.price, balance, stock: product.stock, productId: product.id });
        if (result.status === 'out_of_stock') {
          reject(new Error('This device is out of stock.'));
          return;
        }
        resolve(result);
      }, 1100)
    );
  }
}
