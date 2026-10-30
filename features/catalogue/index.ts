// Public API of the catalogue feature. Presentation + application only.
export { default as CataloguePage } from './presentation/CataloguePage';
export { default as ProductGrid } from './presentation/ProductGrid';
export { default as ProductCard } from './presentation/ProductCard';
export { default as FilterTabs } from './presentation/FilterTabs';
export { fetchProducts, setSearch, setCategory, setSort, selectCatalogue, selectFilteredProducts } from './application/catalogue-slice';
export type { CatalogueState } from './application/catalogue-slice';
export { filterProducts, sortProducts } from './domain/filters';
export type { CatalogueProduct, ProductCore, SortOption } from './domain/types';
export { LocalProductRepository } from './infrastructure/product-repository';
export { default } from './application/catalogue-slice';
