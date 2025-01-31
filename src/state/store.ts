import { configureStore } from "@reduxjs/toolkit";
import manifestReducer from "./Chart/manifestSlice";
import projectReducer from "./Chart/projectSlice";
import chartReducer from "./Chart/chartSlice";

export const store = configureStore({
  reducer: {
    manifest: manifestReducer,
    project: projectReducer,
    chart: chartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
