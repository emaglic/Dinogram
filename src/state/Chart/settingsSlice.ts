import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialValues = {
  isDragging: false,
  history: [],
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialValues,
  reducers: {
    setDragging: (state, action) => {
      state.isDragging = action.payload;
    },
    updateHistory: (state, action) => {
      const historyObj = state.history.length
        ? state.history[state.history.length - 1]
        : [];
      const isEqual = _.isEqual(historyObj, action.payload);
      if (isEqual) {
        return;
      }
      state.history.push(action.payload);
    },
  },
});

export const { setDragging, updateHistory } = settingsSlice.actions;

export const selectIsDragging = (state: RootState) => state.settings.isDragging;
export const selectHistory = (state: RootState) => state.settings.history;
export default settingsSlice.reducer;
