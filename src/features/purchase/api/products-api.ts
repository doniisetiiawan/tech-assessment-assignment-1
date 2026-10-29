import { mockProducts } from '@/shared/data/mock-products';

export const getProductByIdApi = (id: string) =>
    new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            const found = mockProducts.find((p) => p.id === id);
            if (!found) reject(new Error('We couldn’t find that device.'));
            else resolve({ ...found, stock: 12 });
        }, 600);
    });

export const simulateBuyApi = (product: any, balance: number) =>
    new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            if (!product || product.stock < 1) {
                reject(new Error('This device is out of stock.'));
                return;
            }
            if (product.price > balance) {
                resolve({ status: 'insufficient_balance' });
                return;
            }
            resolve({
                order_id: 'ORB-' + Date.now().toString().slice(-8),
                product_id: product.id,
                total: product.price,
                status: 'success',
            });
        }, 1100);
    });
