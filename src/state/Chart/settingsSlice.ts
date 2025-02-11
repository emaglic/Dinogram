import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialValues = {
  isDragging: false,
  history: {
    currentIndex: 0,
    history: [],
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialValues,
  reducers: {
    setDragging: (state, action) => {
      state.isDragging = action.payload;
    },
    updateHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { setDragging, updateHistory } = settingsSlice.actions;

export const selectIsDragging = (state: RootState) => state.settings.isDragging;
export const selectHistory = (state: RootState) => state.settings.history;
export const selectHistoryValues = (state: RootState) =>
  state.settings.history.values;
export const selectHistoryCurrentIndex = (state: RootState) =>
  state.settings.history.currentIndex;
export default settingsSlice.reducer;
