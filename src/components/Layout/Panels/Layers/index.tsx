import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Styles from "./index.style";
import NodeLayersPanel from "./Nodes";
import EdgeLayersPanel from "./Edges";

const LayersPanel = () => {
  const theme = useTheme();
  const styles = Styles(theme);

  const [nodesPanelVisible, setNodesPanelVisible] = useState(true);
  const [edgesPanelVisible, setEdgesPanelVisible] = useState(true);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.layersGroup}>
        <Box sx={styles.layerHeader}>
          <Typography variant="h6">Elements</Typography>
        </Box>
        <NodeLayersPanel />
      </Box>
      <Box sx={styles.layersGroup}>
        <Box sx={styles.layerHeader}>
          <Typography variant="h6">Lines</Typography>
        </Box>
        <EdgeLayersPanel />
      </Box>
    </Box>
  );
};

export default LayersPanel;
