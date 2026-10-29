export { default } from './store/catalogue-slice';
export { fetchProducts, setSearch, setCategory, setSort, selectCatalogue, selectFilteredProducts } from './store/catalogue-slice';
export { filterProducts, sortProducts } from './model/filters';
export type { CatalogueProduct, ProductCore, SortOption } from './model/filters';
export type { CatalogueState } from './store/catalogue-slice';
