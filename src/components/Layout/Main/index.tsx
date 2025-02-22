import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Chart from "../Chart";
import Header from "../Header";
import Styles from "./index.styles";
import { Box } from "@mui/material";
import FloatingControlBar from "../Controls/Left";
import OpenProjectDialog from "@/components/Settings/OpenProjectDialog";
import TopControls from "../Controls/Top";
import StateSaver from "@/components/Settings/StateSaver";
import Sidebar from "@/components/Layout/Sidebar";
import KeyboardEvents from "@/components/Settings/KeyboardEvents";
import { ReactFlowProvider } from "@xyflow/react";

const Main = () => {
  const theme = useTheme();
  const styles = Styles(theme);

  const [leftPanelExpanded, setLeftPanelExpanded] = useState(true);
  const [rightPanelExpanded, setRightPanelExpanded] = useState(true);

  return (
    <>
      <ReactFlowProvider>
        <KeyboardEvents />
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
      </ReactFlowProvider>
    </>
  );
};

export default Main;
