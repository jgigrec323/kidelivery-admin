import { configureStore } from "@reduxjs/toolkit";
import delivererReducer from "./deliverer-slice";

const store = configureStore({
  reducer: {
    deliverers: delivererReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store as default
export default store;
