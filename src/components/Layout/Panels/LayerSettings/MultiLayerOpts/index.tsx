import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import { Box, Typography } from "@mui/material";
import {
  AlignTop,
  AlignBottom,
  AlignLeft,
  AlignRight,
  AlignCenterHorz,
  AlignCenterVert,
  DistributeHorizontal,
  DistributeVertical,
  CompressHorizontal,
  CompressVertical,
  ExpandHorizontal,
  ExpandVertical,
} from "@/components/Controls";

const MultiLayerOpts = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  return (
    <Box sx={styles.container}>
      <Box sx={styles.toolRow}>
        <Typography>Alignment</Typography>
        <Box sx={styles.row}>
          <AlignLeft />
          <AlignCenterHorz />
          <AlignRight />
          <AlignTop />
          <AlignCenterVert />
          <AlignBottom />
        </Box>
      </Box>
      <Box sx={styles.toolRow}>
        <Typography>Distribute</Typography>
        <Box sx={styles.row}>
          <DistributeHorizontal />
          <DistributeVertical />
        </Box>
      </Box>
      <Box sx={styles.toolRow}>
        <Typography>Transform</Typography>
        <Box sx={styles.row}>
          <CompressHorizontal />
          <CompressVertical />
          <ExpandHorizontal />
          <ExpandVertical />
        </Box>
      </Box>
    </Box>
  );
};

export default MultiLayerOpts;
