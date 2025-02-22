import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import {
  selectSelectedEdges,
  selectSelectedNodes,
} from "@/state/Chart/chartSlice";
import ElementProperties from "@/components/Layout/Panels/LayerSettings/LayerProps";
import MultiLayerOpts from "./MultiLayerOpts";
import Styles from "./index.style";

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
        <Typography>Incompatible Selection</Typography>
      </Box>
    );
  }

  return <ElementProperties selectedChartElements={[...nodes, ...edges]} />;
};

const LayerSettings = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const nodes = useSelector(selectSelectedNodes);
  const edges = useSelector(selectSelectedEdges);

  return <Box sx={styles.container}>{getContent(nodes, edges)}</Box>;
};

export default LayerSettings;
