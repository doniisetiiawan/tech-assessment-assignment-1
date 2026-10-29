import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserApi } from '../api/user-api';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  membership: string;
  name: string;
}

export interface SessionState {
  user: User | null;
  walletBalance: number;
  orders: unknown[];
}

const initialState: SessionState = { user: null, walletBalance: 1050, orders: [] };

export const fetchUser = createAsyncThunk('session/fetchUser', async () => {
  const u = await fetchUserApi();
  return { ...u, name: u.first_name + ' ' + u.last_name } satisfies User;
});

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.walletBalance = action.payload.wallet_balance;
    });
  },
});

export const { addOrder } = sessionSlice.actions;

export const selectUser = (state: { session: SessionState }) => state.session.user;
export const selectWalletBalance = (state: { session: SessionState }) => state.session.walletBalance;

export default sessionSlice.reducer;
