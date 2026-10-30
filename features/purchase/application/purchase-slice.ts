import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ProductDetail } from '../domain/product';
import type { PurchaseDecision } from '../domain/purchase';
import type { ProductRepository } from './ports/product-repository';

// Dependencies injected by the composition root — the slice knows only the port.
export interface ThunkApi {
  purchaseProducts: ProductRepository;
}

export interface PurchaseState {
  selected: ProductDetail | null;
  order: PurchaseDecision | null;
  status: 'idle' | 'loading-detail' | 'buying' | 'ready' | 'not-found';
  error: string;
}

const initialState: PurchaseState = { selected: null, order: null, status: 'idle', error: '' };

export const fetchProduct = createAsyncThunk('purchase/fetchProduct', (id: string, { extra }) =>
  (extra as ThunkApi).purchaseProducts.findById(id)
);

export const buyProduct = createAsyncThunk<PurchaseDecision, void, { state: { purchase: PurchaseState; session: { walletBalance: number } } }>(
  'purchase/buy',
  async (_, { getState, extra }) => {
    const product = getState().purchase.selected;
    if (!product) throw new Error('No device selected.');
    return (extra as ThunkApi).purchaseProducts.buy(product, getState().session.walletBalance);
  }
);

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
