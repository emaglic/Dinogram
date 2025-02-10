import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import useSelectedChartElements from "@/hooks/useGetSelected";
import { useTheme } from "@mui/material/styles";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import Styles from "../index.style";

import { Box, Tooltip } from "@mui/material";
import { selectChart, updateNodes } from "@/state/Chart/chartSlice";

const Redo = ({ tooltipPlacement = "top" }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  //const chart = useSelector(selectChart);
  //const { nodes } = useSelectedChartElements(chart);

  const handleClick = () => {
    // dispatch(updateNodes(updatedNodes));
  };

  return (
    <Tooltip title="Redo" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <RedoIcon sx={styles.svg} />
      </Box>
    </Tooltip>
  );
};

export default Redo;
