import type { ProductCore, SortOption } from './types';

export type { ProductCore, CatalogueProduct, SortOption } from './types';

export function filterProducts(products: ProductCore[], category: string, search: string): ProductCore[] {
  const q = search.toLowerCase();
  return products.filter(
    p => (category === 'All devices' || p.type === category) && (p.name + p.brand).toLowerCase().includes(q)
  );
}

export function sortProducts<T extends ProductCore>(products: T[], sort: SortOption): T[] {
  if (sort === 'featured') return products;
  const sorted = [...products];
  sorted.sort((a, b) => (sort === 'low' ? a.price - b.price : b.price - a.price));
  return sorted;
}
