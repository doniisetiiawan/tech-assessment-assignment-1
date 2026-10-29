import { createSlice } from '@reduxjs/toolkit';

interface Selected {
  id: string;
  name: string;
  price: number;
  [key: string]: unknown;
}

interface PurchaseState {
  selected: Selected | null;
}

const initialState: PurchaseState = { selected: null };

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    setSelected(state, action) {
      state.selected = action.payload;
    },
  },
});

export const { setSelected } = purchaseSlice.actions;
export default purchaseSlice.reducer;
