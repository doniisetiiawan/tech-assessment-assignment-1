import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { filterProducts, sortProducts } from '../domain/filters';
import type { CatalogueProduct, SortOption } from '../domain/types';
import type { ProductRepository } from './ports/product-repository';

// Injected via composition root (shared/store/store.ts) — never imported directly.
export interface ThunkApi {
  catalogueProducts: ProductRepository;
}

export interface CatalogueState {
  products: CatalogueProduct[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  search: string;
  category: string;
  sort: SortOption;
}

const initialState: CatalogueState = {
  products: [],
  status: 'idle',
  search: '',
  category: 'All devices',
  sort: 'featured',
};

export const fetchProducts = createAsyncThunk(
  'catalogue/fetchProducts',
  (_: void, { extra }) => (extra as ThunkApi).catalogueProducts.fetchCatalogue()
);

const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { setSearch, setCategory, setSort } = catalogueSlice.actions;

export const selectCatalogue = (state: { catalogue: CatalogueState }) => state.catalogue;

export const selectFilteredProducts = createSelector(
  selectCatalogue,
  c => sortProducts(filterProducts(c.products, c.category, c.search) as CatalogueProduct[], c.sort)
);

export default catalogueSlice.reducer;
