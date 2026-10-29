import { configureStore } from '@reduxjs/toolkit';
import { sessionReducer } from '@/features/session/store/session-slice';
import { catalogueReducer } from '@/features/catalogue/store/catalogue-slice';
import { purchaseReducer } from '@/features/purchase/store/purchase-slice';
export const store = configureStore({
    reducer: {
        session: sessionReducer,
        catalogue: catalogueReducer,
        purchase: purchaseReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
