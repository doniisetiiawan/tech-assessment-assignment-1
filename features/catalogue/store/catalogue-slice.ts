import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { filterProducts, sortProducts, type CatalogueProduct, type SortOption } from '../model/filters';

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

interface RawProduct {
  id: string;
  price: number;
  [key: string]: unknown;
}

function productsApi(): Promise<RawProduct[]> {
  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve([
          { id: '1', name: 'iPhone 16 Pro', brand: 'Apple', type: 'Smartphones', price: 999, color: 'Desert Titanium', tone: 'sand', tag: 'POPULAR', storage: '128 GB', screen: '6.3-inch', chip: 'A18 Pro', camera: '48 MP', battery: 'Up to 27 hours', os: 'iOS 18' },
          { id: '2', name: 'Galaxy S25 Ultra', brand: 'Samsung', type: 'Smartphones', price: 1299, color: 'Titanium Gray', tone: 'gray', tag: 'NEW ARRIVAL', storage: '256 GB', screen: '6.9-inch', chip: 'Snapdragon 8 Elite', camera: '200 MP', battery: '5,000 mAh', os: 'Android 15' },
          { id: '3', name: 'iPad Air', brand: 'Apple', type: 'Tablets', price: 599, color: 'Sky Blue', tone: 'blue', tag: '', storage: '128 GB', screen: '11-inch', chip: 'Apple M3', camera: '12 MP', battery: 'Up to 10 hours', os: 'iPadOS 18' },
          { id: '4', name: 'Pixel 9 Pro', brand: 'Google', type: 'Smartphones', price: 999, color: 'Sage', tone: 'sage', tag: '', storage: '128 GB', screen: '6.3-inch', chip: 'Google Tensor G4', camera: '50 MP', battery: '4,700 mAh', os: 'Android 14' },
          { id: '5', name: 'Galaxy Tab S10+', brand: 'Samsung', type: 'Tablets', price: 999, color: 'Moonstone Gray', tone: 'purple', tag: '', storage: '256 GB', screen: '12.4-inch', chip: 'Dimensity 9300+', camera: '13 MP', battery: '10,090 mAh', os: 'Android 14' },
          { id: '6', name: 'iPhone 16', brand: 'Apple', type: 'Smartphones', price: 799, color: 'Ultramarine', tone: 'indigo', tag: 'GREAT VALUE', storage: '128 GB', screen: '6.1-inch', chip: 'A18', camera: '48 MP', battery: 'Up to 22 hours', os: 'iOS 18' },
        ]),
      750
    )
  );
}

export const fetchProducts = createAsyncThunk('catalogue/fetchProducts', async () => {
  const products = await productsApi();
  return products.map(x => ({ ...x, priceLabel: '$' + x.price.toLocaleString('en-US') })) as unknown as CatalogueProduct[];
});

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
