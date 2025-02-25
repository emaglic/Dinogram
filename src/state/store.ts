import { configureStore } from "@reduxjs/toolkit";
import manifestReducer from "./Manifest/manifestSlice";
import projectReducer from "./Project/projectSlice";
import chartReducer from "./Chart/chartSlice";
import settingsReducer from "./Settings/settingsSlice";

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
