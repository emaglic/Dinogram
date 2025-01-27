import React from "react";
import { Box } from "@mui/material";
import LayersPanel from "../Panels/Layers";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";

const LeftPanel = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  return (
    <Box>
      <LayersPanel />
    </Box>
  );
};

export default LeftPanel;
