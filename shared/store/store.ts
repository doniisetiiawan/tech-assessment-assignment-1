import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session-slice';
import catalogueReducer from './catalogue-slice';
import purchaseReducer from './purchase-slice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    catalogue: catalogueReducer,
    purchase: purchaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
