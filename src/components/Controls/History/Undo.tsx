import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import useSelectedChartElements from "@/hooks/useGetSelected";
import { useTheme } from "@mui/material/styles";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import Styles from "../index.style";

import { Box, Tooltip } from "@mui/material";
import {
  replaceChart,
  selectChart,
  updateNodes,
} from "@/state/Chart/chartSlice";
import { selectHistory } from "@/state/Chart/settingsSlice";
import { undo } from "@/state/Chart/chartSlice";

const Undo = ({ tooltipPlacement = "top" }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

  const history = useSelector(selectHistory);
  //const { nodes } = useSelectedChartElements(chart);

  const handleClick = () => {
    dispatch(undo());
  };

  return (
    <Tooltip title="Undo" arrow placement={tooltipPlacement}>
      <Box sx={styles.icon} onClick={handleClick}>
        <UndoIcon sx={styles.svg} />
      </Box>
    </Tooltip>
  );
};

export default Undo;
