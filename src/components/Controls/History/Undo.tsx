import React from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import UndoIcon from "@mui/icons-material/Undo";
import Styles from "../index.style";
import { Box, Tooltip } from "@mui/material";
import { undo } from "@/state/Chart/chartSlice";

const Undo = ({ tooltipPlacement = "top" }) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const dispatch = useDispatch();

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
