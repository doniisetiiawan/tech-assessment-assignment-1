// Composition Root — the ONLY place that knows every concrete class (doc §5.5).
// Outer layers (infrastructure) are wired to inner layers (application ports) here.
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer, { type SessionState } from '../../features/session/application/session-slice';
import catalogueReducer, { type CatalogueState } from '../../features/catalogue/application/catalogue-slice';
import purchaseReducer, { type PurchaseState } from '../../features/purchase/application/purchase-slice';
import { LocalUserRepository } from '../../features/session/infrastructure/user-repository';
import { LocalProductRepository as CatalogueLocalProductRepository } from '../../features/catalogue/infrastructure/product-repository';
import { LocalProductRepository as PurchaseLocalProductRepository } from '../../features/purchase/infrastructure/product-repository';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    catalogue: catalogueReducer,
    purchase: purchaseReducer,
  },
  // Dependency injection: each feature's thunks resolve their ports via `extra`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          userRepository: new LocalUserRepository(),
          catalogueProducts: new CatalogueLocalProductRepository(),
          purchaseProducts: new PurchaseLocalProductRepository(),
        },
      },
    }),
});

export type RootState = {
  session: SessionState;
  catalogue: CatalogueState;
  purchase: PurchaseState;
};
export type AppDispatch = typeof store.dispatch;
