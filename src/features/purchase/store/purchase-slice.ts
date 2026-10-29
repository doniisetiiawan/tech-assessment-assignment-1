import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedProduct: null as any,
    orders: [] as any[],
};

export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        },
    },
});

export const { setSelectedProduct, addOrder } = purchaseSlice.actions;
export const purchaseReducer = purchaseSlice.reducer;
