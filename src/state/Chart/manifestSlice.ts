import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

const initialValues = [];

const manifestSlice = createSlice({
  name: "manifest",
  initialState: initialValues,
  reducers: {
    setManifest: (state, action) => {
      return action.payload;
    },
    updateManifest: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { setManifest, updateManifest } = manifestSlice.actions;

export const selectManifest = (state: RootState) => state.manifest;
export default manifestSlice.reducer;
