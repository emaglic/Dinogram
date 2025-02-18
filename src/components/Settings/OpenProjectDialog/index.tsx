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
import ShapeSVG from "@/components/Nodes/Shape/ShapeSVG";
import logo from "@/assets/logo.svg?react";

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

  const handleLoadProject = (projectId: string) => {
    const project = loadLSJSON(projectId, null);
    setDialogOpen(false);
    if (!project) return;
    const { chart, ...projectProps } = project;
    dispatch(setManifest(manifest));
    dispatch(updateProject(projectProps));
    dispatch(replaceChart(chart));
  };

  return (
    <Dialog sx={styles.container} open={dialogOpen}>
      <Box sx={styles.titleContainer}>
        <ShapeSVG
          component={logo}
          fill={{ color: "#fff" }}
          width="4rem"
          height="4rem"
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dinogram
        </Typography>
        <Divider sx={{ width: "100%", marginTop: "1rem" }} />
      </Box>

      <DialogContent
        sx={{
          padding: "0px 1.25rem 1.25rem 1.25rem",
        }}
      >
        <Box sx={styles.contentContainer}>
          {manifest && manifest.length ? (
            <>
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
