import React from "react";
import { Box, Typography } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.styles";

const NodeHeader = ({ label }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  return (
    <Box sx={styles.container}>
      <DragHandleIcon />
      <Typography sx={styles.label} variant="caption">
        {label}
      </Typography>
      <DragHandleIcon />
    </Box>
  );
};

export default NodeHeader;
