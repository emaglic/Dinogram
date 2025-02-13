import useSelectedChartElements from "@/hooks/useGetSelected";
import { selectChart } from "@/state/Chart/chartSlice";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ElementProperties from "@/components/Layout/Panels/LayerSettings/LayerProps";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import MultiLayerOpts from "./MultiLayerOpts";

const getContent = (nodes, edges) => {
  const theme = useTheme();
  const styles = Styles(theme);

  if (!nodes.length && !edges.length) {
    return (
      <Box sx={styles.innerContainer}>
        <Typography>Nothing Selected</Typography>
      </Box>
    );
  }

  if (nodes.length > 1) {
    return <MultiLayerOpts />;
  }

  if (edges.length > 1) {
    return (
      <Box sx={styles.innerContainer}>
        <Typography>Multiple Edges Selected</Typography>
      </Box>
    );
  }

  if (edges.length && nodes.length) {
    return (
      <Box sx={styles.innerContainer}>
        <Typography>Invalid Selection</Typography>
      </Box>
    );
  }

  return <ElementProperties selectedChartElements={[...nodes, ...edges]} />;
};

const LayerSettings = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const chart = useSelector(selectChart);
  const { nodes, edges } = useSelectedChartElements(chart);
  // const selectedChartElements = [...nodes, ...edges];

  return <Box sx={styles.container}>{getContent(nodes, edges)}</Box>;
};

export default LayerSettings;
