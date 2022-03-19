import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../services/userSlice";
import modulesSlice from "../services/modulesSlice";
import demoSlice from "../services/demoSlice";

import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
   key: "root",
   version: 1,
   storage: storageSession,
};

const rootReducer = combineReducers({
   user: userSlice,
   modules: modulesSlice,
   demo: demoSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export let persistor = persistStore(store);
export default store;
