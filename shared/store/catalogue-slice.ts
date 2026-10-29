import { createSlice } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  brand: string;
  type: string;
  price: number;
  color: string;
  tone: string;
  tag?: string;
  storage: string;
  priceLabel: string;
}

export type SortOption = 'featured' | 'low' | 'high';

interface CatalogueState {
  products: Product[];
  search: string;
  category: string;
  sort: SortOption;
}

const initialState: CatalogueState = { products: [], search: '', category: 'All devices', sort: 'featured' };

const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
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
});

export const { setProducts, setSearch, setCategory, setSort } = catalogueSlice.actions;
export default catalogueSlice.reducer;
