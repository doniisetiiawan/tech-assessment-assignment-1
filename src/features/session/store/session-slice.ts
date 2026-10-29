import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    user: null as any,
    walletBalance: 1050,
};
export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});
export const { setUser } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
