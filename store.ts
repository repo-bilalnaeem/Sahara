import { configureStore } from "@reduxjs/toolkit";
import navReducer from "@/slices/navSlice";
import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
