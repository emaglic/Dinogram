import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Chart from "../Chart";
import Header from "../Header";
import Styles from "./index.styles";

import { Box } from "@mui/material";
import { RootState } from "../../../state/store";
import LeftPanel from "../LeftPanel";

const index = () => {
  const theme = useTheme();
  const styles = Styles(theme);

  const chartState = useSelector((state: RootState) => state.chart);

  return (
    <Box sx={styles.container}>
      <Header />
      <Box sx={styles.lowerContainer}>
        <LeftPanel />
        <Chart chartState={chartState} />
      </Box>
    </Box>
  );
};

export default index;
