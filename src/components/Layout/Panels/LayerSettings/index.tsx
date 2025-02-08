import useSelectedChartElements from "@/hooks/useGetSelected";
import { selectChart } from "@/state/Chart/chartSlice";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ElementProperties from "@/components/Layout/Panels/LayerSettings/LayerProps";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import MultiLayerOpts from "./MultiLayerOpts";

const getContent = (selectedChartElements) => {
  const theme = useTheme();
  const styles = Styles(theme);
  switch (selectedChartElements.length) {
    case 0:
      return (
        <Box sx={styles.innerContainer}>
          <Typography>Nothing Selected</Typography>
        </Box>
      );
    case 1:
      return (
        <ElementProperties selectedChartElements={selectedChartElements} />
      );
    default:
      return <MultiLayerOpts />;
  }
};

const LayerSettings = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const chart = useSelector(selectChart);
  const { nodes, edges } = useSelectedChartElements(chart);
  const selectedChartElements = [...nodes, ...edges];

  return <Box sx={styles.container}>{getContent(selectedChartElements)}</Box>;
};

export default LayerSettings;
