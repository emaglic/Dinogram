import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialValues = {
  projectName: null,
  projectDescription: null,
  createdDate: null,
  lastUpdated: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState: initialValues,
  reducers: {
    updateProject: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateProject } = projectSlice.actions;

export const selectProject = (state: RootState) => state.project;
export default projectSlice.reducer;
