import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Chart from "../Chart";
import Header from "../Header";
import Styles from "./index.styles";

import { Box } from "@mui/material";
import { RootState } from "@/state/store";
import LeftPanel from "../LeftPanel";
import FloatingControlBar from "../Controls/Left";
import OpenProjectDialog from "@/components/Settings/OpenProjectDialog";
import { selectManifest } from "@/state/Chart/manifestSlice";
import { selectProject } from "@/state/Chart/projectSlice";
import { selectChart } from "@/state/Chart/chartSlice";
import { useLSSaveManifest, useLSSaveProject } from "@/hooks/LocalStorage/save";

const Main = () => {
  const theme = useTheme();
  const styles = Styles(theme);

  const manifest = useSelector(selectManifest);
  const project = useSelector(selectProject);
  const chart = useSelector(selectChart);

  useLSSaveManifest(manifest);
  useLSSaveProject(project, chart);

  return (
    <>
      <OpenProjectDialog />
      <Box sx={styles.container}>
        <Header />
        <Box sx={styles.lowerContainer}>
          <LeftPanel />
          <FloatingControlBar />
          <Chart />
        </Box>
      </Box>
    </>
  );
};

export default Main;
