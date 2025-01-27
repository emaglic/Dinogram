import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { RootState } from "../../../../state/store";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";

const LayersPanel = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const chartState = useSelector((state: RootState) => state.chart);
  const allLayers = [...chartState.nodes];
  return (
    <Box>
      {allLayers.map((layer, index) => {
        return <Box key={index}>{layer.data.label}</Box>;
      })}
    </Box>
  );
};

export default LayersPanel;
