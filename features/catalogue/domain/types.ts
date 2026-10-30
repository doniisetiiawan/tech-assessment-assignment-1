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
