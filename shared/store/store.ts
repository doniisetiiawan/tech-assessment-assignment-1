import { configureStore } from '@reduxjs/toolkit';
import sessionReducer, { type SessionState } from '../../features/session/store/session-slice';
import catalogueReducer, { type CatalogueState } from '../../features/catalogue/store/catalogue-slice';
import purchaseReducer, { type PurchaseState } from '../../features/purchase/store/purchase-slice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    catalogue: catalogueReducer,
    purchase: purchaseReducer,
  },
});

export type RootState = {
  session: SessionState;
  catalogue: CatalogueState;
  purchase: PurchaseState;
};
export type AppDispatch = typeof store.dispatch;
