import React from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import { Box } from "@mui/material";
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
  Undo,
  Redo,
} from "@/components/Controls";
import { selectSelectedNodes } from "@/state/Chart/chartSlice";

const TopControls = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const nodes = useSelector(selectSelectedNodes);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.section}>
        <Undo />
        <Redo />
      </Box>
      {nodes.length > 1 && (
        <>
          <Box sx={styles.section}>
            <AlignLeft />
            <AlignCenterHorz />
            <AlignRight />
            <AlignTop />
            <AlignCenterVert />
            <AlignBottom />
          </Box>
          <Box sx={styles.section}>
            <DistributeHorizontal />
            <DistributeVertical />
          </Box>
          <Box sx={styles.section}>
            <CompressHorizontal />
            <CompressVertical />
            <ExpandHorizontal />
            <ExpandVertical />
          </Box>
        </>
      )}
    </Box>
  );
};

export default TopControls;
