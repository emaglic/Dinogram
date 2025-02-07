import React, { useState, useEffect } from "react";
import { useLSLoadJSON, loadLSJSON } from "@/hooks/LocalStorage/load";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import ManifestList from "./ManifestList";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.styles";
import NewProject from "./NewProject";
import getNewProject from "@/base/project";
import { useDispatch } from "react-redux";
import { updateProject } from "@/state/Chart/projectSlice";
import getNewChart from "@/base/chart";
import { replaceChart } from "@/state/Chart/chartSlice";
import { setManifest, updateManifest } from "@/state/Chart/manifestSlice";

const OpenProjectDialog = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(true);
  const manifest = loadLSJSON("manifest", []);

  const handleCreateNewProject = (projectName: string) => {
    if (!projectName) return;
    const newProject = getNewProject(projectName);
    const newChart = getNewChart();
    dispatch(setManifest([...manifest, newProject]));
    dispatch(updateProject(newProject));
    dispatch(replaceChart(newChart));
    setDialogOpen(false);
  };

  const handleLoadProject = (projectName: string) => {
    if (!projectName) return;
    const project = loadLSJSON(projectName, null);
    setDialogOpen(false);
    if (!project) return;
    const { chart, ...projectProps } = project;
    dispatch(updateProject(projectProps));
    dispatch(replaceChart(chart));
  };

  return (
    <Dialog sx={styles.container} open={dialogOpen}>
      <DialogTitle>Project Settings</DialogTitle>
      <DialogContent>
        <Box sx={styles.contentContainer}>
          {manifest && manifest.length ? (
            <>
              <Typography textAlign="center" variant={"h6"}>
                Open Existing Project
              </Typography>
              <ManifestList
                manifest={manifest}
                handleLoadProject={handleLoadProject}
              />
              <Divider />
            </>
          ) : (
            <></>
          )}

          <NewProject handleCreateNewProject={handleCreateNewProject} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OpenProjectDialog;
