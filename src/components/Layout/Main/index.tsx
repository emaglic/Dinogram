import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Chart from "@/components/Layout/Chart";
import Header from "@/components/Layout/Header";
import Styles from "./index.style";
import { Box } from "@mui/material";
import FloatingControlBar from "@/components/Layout/Controls/Left";
import TopControls from "@/components/Layout/Controls/Top";
import Sidebar from "@/components/Layout/Sidebar";
import KeyboardEvents from "@/components/Settings/KeyboardEvents";
import { ReactFlowProvider } from "@xyflow/react";
import StateSaver from "@/components/Settings/StateSaver";
import OpenProjectDialog from "@/components/Settings/OpenProjectDialog";

const Main = () => {
  const theme = useTheme();
  const styles = Styles(theme);

  const [leftPanelExpanded, setLeftPanelExpanded] = useState(true);
  const [rightPanelExpanded, setRightPanelExpanded] = useState(true);

  return (
    <>
      <ReactFlowProvider>
        <KeyboardEvents />
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
