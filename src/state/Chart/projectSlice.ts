import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

export interface ProjectState {
  id: string;
  name: string;
  projectDescription: string;
  createdDate: string;
  lastUpdated: string;
  mode: "light" | "dark";
}

const initialValues: ProjectState = {
  id: "",
  name: "",
  projectDescription: "",
  createdDate: "",
  lastUpdated: "",
  mode: undefined,
};

const projectSlice = createSlice({
  name: "project",
  initialState: initialValues,
  reducers: {
    updateProject: (state, action) => {
      return action.payload;
    },
    updateProjectProps: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProject, updateProjectProps } = projectSlice.actions;

export const selectProject = (state: RootState) => state.project;
export default projectSlice.reducer;
