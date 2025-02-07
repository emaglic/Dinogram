import { configureStore } from "@reduxjs/toolkit";
import manifestReducer from "./Chart/manifestSlice";
import projectReducer from "./Chart/projectSlice";
import chartReducer from "./Chart/chartSlice";
import settingsReducer from "./Chart/settingsSlice";

export const store = configureStore({
  reducer: {
    manifest: manifestReducer,
    project: projectReducer,
    chart: chartReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
