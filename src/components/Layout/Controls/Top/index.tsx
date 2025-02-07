import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Styles from "./index.style";
import { Box, Typography } from "@mui/material";
import useSelectedChartElements from "@/hooks/useGetSelected";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
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
import { selectChart } from "@/state/Chart/chartSlice";

const TopControls = () => {
  const theme = useTheme();
  const styles = Styles(theme);
  const chart = useSelector(selectChart);
  const { nodes, edges } = useSelectedChartElements(chart);
  const selectedChartElements = [...nodes, ...edges];

  return (
    <Box sx={styles.container}>
      <Box sx={styles.section}>
        <Undo />
        <Redo />
      </Box>
      {selectedChartElements.length > 1 && (
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
