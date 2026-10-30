import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { User } from '../domain/user';
import type { UserRepository } from './ports/user-repository';

// Injected by the composition root — the slice knows only the port.
export interface ThunkApi {
  userRepository: UserRepository;
}

export interface SessionState {
  user: User | null;
  walletBalance: number;
  orders: unknown[];
}

const initialState: SessionState = { user: null, walletBalance: 1050, orders: [] };

export const fetchUser = createAsyncThunk('session/fetchUser', (_, { extra }) =>
  (extra as ThunkApi).userRepository.fetchCurrentUser()
);

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
      state.walletBalance = 1050;
    });
  },
});

export const { addOrder } = sessionSlice.actions;

export const selectUser = (state: { session: SessionState }) => state.session.user;
export const selectWalletBalance = (state: { session: SessionState }) => state.session.walletBalance;

export default sessionSlice.reducer;
