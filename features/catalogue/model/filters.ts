export interface ProductCore {
  id: string;
  name: string;
  brand: string;
  type: string;
  price: number;
}

export interface CatalogueProduct extends ProductCore {
  color: string;
  tone: string;
  tag?: string;
  storage: string;
  priceLabel: string;
}

export type SortOption = 'featured' | 'low' | 'high';

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
