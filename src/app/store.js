// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // Import sessionStorage

import userReducer from "../features/Auth/userSlice";

// Configuration for redux-persist using sessionStorage
const persistConfig = {
    key: "root",
    storage: storageSession, // Use sessionStorage
};

// Create a persisted reducer for each slice
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Configure the store with persisted reducers
export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
    },
});

// Create the persistor for the store
export const persistor = persistStore(store);
