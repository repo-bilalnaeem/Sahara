import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/slices/apiSlice";
import authReducer from "@/slices/authSlice";

const rootReducer = combineReducers({
  auth: authReducer, // ❌ No need for Redux Persist here
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch