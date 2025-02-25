import { ChartNode } from "@/types/chart/nodes";
import { RootState } from "../store";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { ChartEdge } from "@/types/chart/edges";

type KeyboardKeyValue = 0 | 1 | 2;
interface KeyboardKeys {
  [key: string]: KeyboardKeyValue;
}

interface Clipboard {
  nodes: ChartNode[];
  edges: ChartEdge[];
}

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
  } as KeyboardKeys,
  clipboard: {
    nodes: [],
    edges: [],
  } as Clipboard,
  dragLockAxis: null,
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
      state.clipboard.nodes = action.payload.nodes;
      state.clipboard.edges = action.payload.edges;
    },
    setDragLockAxis: (state, action) => {
      state.dragLockAxis = action.payload;
    },
  },
});

// Export Types
export type KeyboardKeysType = typeof initialValues.keyboardKeys;

// Export Reducer Actions
export const { setDragging, setKeyboardKeys, setClipboard, setDragLockAxis } =
  settingsSlice.actions;

// Export Selectors
export const selectIsDragging = (state: RootState) => state.settings.isDragging;
export const selectKeyboardKeys = (state: RootState) =>
  state.settings.keyboardKeys;
export const selectClipboard = (state: RootState) => state.settings.clipboard;
export const selectDragLockAxis = (state: RootState) =>
  state.settings.dragLockAxis;

// Export Reducer
export default settingsSlice.reducer;
