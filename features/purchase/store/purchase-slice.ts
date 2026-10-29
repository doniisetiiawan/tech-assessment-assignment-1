import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductApi, buyApi, type ProductDetail, type BuyResult } from '../api/product-api';
import type { RootState } from '../../../shared/store/store';

export interface PurchaseState {
  selected: ProductDetail | null;
  order: BuyResult | null;
  status: 'idle' | 'loading-detail' | 'buying' | 'ready' | 'not-found';
  error: string;
}

const initialState: PurchaseState = { selected: null, order: null, status: 'idle', error: '' };

export const fetchProduct = createAsyncThunk('purchase/fetchProduct', (id: string) => fetchProductApi(id));

export const buyProduct = createAsyncThunk('purchase/buy', async (_, { getState }) => {
  const root = getState() as RootState;
  const product = root.purchase.selected;
  if (!product) throw new Error('No device selected.');
  return buyApi(product, root.session.walletBalance);
});

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProduct.pending, state => {
        state.status = 'loading-detail';
        state.error = '';
        state.selected = null;
        state.order = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'ready';
        state.selected = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'not-found';
        state.error = action.error.message ?? 'We couldn’t find that device.';
      })
      .addCase(buyProduct.pending, state => {
        state.status = 'buying';
        state.error = '';
      })
      .addCase(buyProduct.fulfilled, (state, action) => {
        state.status = 'ready';
        state.order = action.payload;
      })
      .addCase(buyProduct.rejected, (state, action) => {
        state.status = 'ready';
        state.error = action.error.message ?? 'Purchase failed. Please try again.';
      });
  },
});

export const selectPurchase = (state: { purchase: PurchaseState }) => state.purchase;

export default purchaseSlice.reducer;
