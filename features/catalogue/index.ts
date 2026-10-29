export { default as CataloguePage } from './components/CataloguePage';
export { default as ProductGrid } from './components/ProductGrid';
export { default as ProductCard } from './components/ProductCard';
export { default as FilterTabs } from './components/FilterTabs';
export { fetchProducts, setSearch, setCategory, setSort, selectCatalogue, selectFilteredProducts } from './store/catalogue-slice';
export type { CatalogueState } from './store/catalogue-slice';
export { filterProducts, sortProducts } from './model/filters';
export type { CatalogueProduct, ProductCore, SortOption } from './model/filters';
export { default } from './store/catalogue-slice';
