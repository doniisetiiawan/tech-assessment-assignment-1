import { mockProducts } from '@/shared/data/mock-products';

export const productsApi = () =>
    new Promise<any[]>((resolve) => {
        setTimeout(() => {
            resolve(
                mockProducts.map((p) => ({
                    ...p,
                    priceLabel: '$' + p.price.toLocaleString('en-US'),
                }))
            );
        }, 750);
    });
