import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApiSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { tableApi } from "./table/tableApiSlice";
import paginationReducer from "./table/paginationSlice";
import authSlice from "./auth/authSlice";

const reducers = {
  auth: authSlice.reducer,
  pagination: paginationReducer,

  [authApi.reducerPath]: authApi.reducer,
  [tableApi.reducerPath]: tableApi.reducer,
};

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers(reducers);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, tableApi.middleware),
});

export const persistor = persistStore(store);

export default store;
