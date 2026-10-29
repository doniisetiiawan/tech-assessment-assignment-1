import { configureStore } from '@reduxjs/toolkit';
import sessionReducer, { type SessionState } from '../../features/session/store/session-slice';
import catalogueReducer from './catalogue-slice';
import purchaseReducer from './purchase-slice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    catalogue: catalogueReducer,
    purchase: purchaseReducer,
  },
});

export type RootState = {
  session: SessionState;
  catalogue: ReturnType<typeof catalogueReducer>;
  purchase: ReturnType<typeof purchaseReducer>;
};
export type AppDispatch = typeof store.dispatch;
