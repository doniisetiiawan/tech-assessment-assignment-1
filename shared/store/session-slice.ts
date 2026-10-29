import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  membership: string;
  name: string;
}

interface SessionState {
  user: User | null;
  walletBalance: number;
  orders: unknown[];
}

const initialState: SessionState = { user: null, walletBalance: 1050, orders: [] };

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    addOrder(state, action) {
      state.orders.push(action.payload);
    },
  },
});

export const { setUser, addOrder } = sessionSlice.actions;
export default sessionSlice.reducer;
