import { RootState } from "../store";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialValues = {
  isDragging: false,
  keyboardKeys: {
    alt: 0,
    ctrl: 0,
    shift: 0,
    delete: 0,
    z: 0,
    c: 0,
    v: 0,
  },
  clipboard: {
    nodes: [],
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialValues,
  reducers: {
    setDragging: (state, action) => {
      state.isDragging = action.payload;
    },
    setKeyboardKeys: (state, action) => {
      state.keyboardKeys = action.payload;
    },
    setClipboard: (state, action) => {
      state.clipboard.nodes = action.payload;
    },
  },
});

export const { setDragging, setKeyboardKeys } = settingsSlice.actions;

export const selectIsDragging = (state: RootState) => state.settings.isDragging;

export const selectKeyboardKeys = (state: RootState) =>
  state.settings.keyboardKeys;

export const selectClipboard = (state: RootState) => state.settings.clipboard;

export default settingsSlice.reducer;
