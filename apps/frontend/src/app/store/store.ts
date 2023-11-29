import { configureStore } from '@reduxjs/toolkit';
import { authorizationReducer } from './slices/authorization.slice';
import { applicationReducer } from './slices/application.slice';

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    application: applicationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
