import { createSlice } from '@reduxjs/toolkit';
import { Category, SortOption } from '../model/filters';

const initialState = {
    products: [] as any[],
    category: 'All devices' as Category,
    search: '',
    sort: 'featured' as SortOption,
    loading: true,
    error: '',
};

export const catalogueSlice = createSlice({
    name: 'catalogue',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            state.loading = false;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setProducts, setCategory, setSearch, setSort, setError } = catalogueSlice.actions;
export const catalogueReducer = catalogueSlice.reducer;
