import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Chart from "../Chart";
import Header from "../Header";
import Styles from "./index.styles";

import { Box } from "@mui/material";
import { RootState } from "@/state/store";
import LeftPanel from "../LeftPanel";
import RightPanel from "../RightPanel";
import FloatingControlBar from "../Controls/Left";
import OpenProjectDialog from "@/components/Settings/OpenProjectDialog";
import { selectManifest } from "@/state/Chart/manifestSlice";
import { selectProject } from "@/state/Chart/projectSlice";
import { selectChart } from "@/state/Chart/chartSlice";
import { useLSSaveManifest, useLSSaveProject } from "@/hooks/LocalStorage/save";
import TopControls from "../Controls/Top";
import { updateHistory } from "@/state/Chart/settingsSlice";
import StateSaver from "@/components/Settings/StateSaver";
import Sidebar from "@/components/Layout/Sidebar";

const Main = () => {
  const theme = useTheme();
  const styles = Styles(theme);

  const [leftPanelExpanded, setLeftPanelExpanded] = useState(true);
  const [rightPanelExpanded, setRightPanelExpanded] = useState(true);

  return (
    <>
      <StateSaver />
      <OpenProjectDialog />
      <Box sx={styles.container}>
        <Header />
        <TopControls />
        <Box
          sx={{
            ...styles.lowerContainer,
            gridTemplateColumns: `${
              leftPanelExpanded ? "auto" : "auto"
            } auto 1fr ${rightPanelExpanded ? "auto" : "auto"}`,
          }}
        >
          <Sidebar
            side="left"
            defaultTab={0}
            expanded={leftPanelExpanded}
            setExpanded={setLeftPanelExpanded}
          />
          <FloatingControlBar />
          <Chart />
          <Sidebar
            side="right"
            defaultTab={1}
            expanded={rightPanelExpanded}
            setExpanded={setRightPanelExpanded}
          />
        </Box>
      </Box>
    </>
  );
};

export default Main;
