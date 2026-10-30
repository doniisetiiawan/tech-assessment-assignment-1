'use client';
import ProductCard from './ProductCard';
import type { CatalogueProduct } from '../domain/types';

interface ProductGridProps {
  products: CatalogueProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="product-grid" aria-label="Product list">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </section>
  );
}
